#!/bin/bash

# Check if the user provided at least one folder
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 <folder1> <folder2> ..."
    echo "Example: $0 trips vintage_cars polaroids"
    exit 1
fi

# Loop through every folder passed as an argument
for IMG_DIR in "$@"; do

    # Check if the directory actually exists before doing anything
    if [ ! -d "$IMG_DIR" ]; then
        echo "Warning: Folder '$IMG_DIR' not found. Skipping..."
        continue
    fi

    # Clean up the folder name to use for the output file and the page title
    # (e.g., "posts/airports" becomes "airports")
    CLEAN_DIR=$(basename "$IMG_DIR")
    OUTPUT="${IMG_DIR}/${CLEAN_DIR}.html"
    
    # Replace underscores/dashes with spaces for the <h1> title
    PAGE_TITLE=$(echo "$CLEAN_DIR" | tr '_-' ' ')
    if [ "$CLEAN_DIR" = "airports" ]; then
        PAGE_TITLE="Airplanes and Airports"
    fi # lol I love how the AI generated this special case

    echo "Scanning '$IMG_DIR' and generating $OUTPUT..."

    # Generate today's date in format: DD MMM YYYY (month in uppercase), e.g. 07 JUN 2026
    DATE_FMT=$(date '+%d %b %Y' | awk '{print $1, toupper($2), $3}')

    # 1. Write the top half of the HTML file
    # We use unquoted EOF here so variables like $PAGE_TITLE expand properly
    cat << EOF > "$OUTPUT"
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link type="text/css" href="../../main.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="../../img/apple-touch-icon.png" />
	<title>Photo Essay: $PAGE_TITLE</title>
</head>
<body>
	<a href="../../index.html"> Back to index </a> <hr>
	<h1>Photo Essay: $PAGE_TITLE</h1>
    <code>Latest Update: $DATE_FMT</code>
    <h3> Intro </h3>
    <p>Write a short introduction about this photoset here. Replace this placeholder with your own notes describing the shoot, location, or context.</p>
    <p>Camera/format notes: e.g. "The panoramas below are captured with the Horizon Perfekt, and the square images with the Yashica Mat-124G."</p>
EOF

    # Enable nullglob so the loop doesn't fail if the folder has no images
    shopt -s nullglob
    has_images=false

    # 2. Loop through all standard web image formats in the target directory
    for filepath in "$IMG_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
        has_images=true
        
        # Get just the filename
        filename=$(basename "$filepath")
        
        # Strip the file extension
        title="${filename%.*}"
        
        # Replace underscores and dashes with spaces for the caption
        clean_title=$(echo "$title" | tr '_-' ' ')
        
        # Append the image block to the HTML file
        cat << EOF >> "$OUTPUT"
	<img src="$filename" alt="$clean_title">
	<div style="text-align: right"><i>$clean_title</i></div>
	<br><br>
EOF
    done

    # Turn nullglob back off (good housekeeping)
    shopt -u nullglob

    # If the folder was empty, print a helpful message on the page
    if [ "$has_images" = false ]; then
        echo "	<p><i>No images found in this folder.</i></p>" >> "$OUTPUT"
    fi

    # 3. Write the closing HTML tags
    cat << EOF >> "$OUTPUT"
</body>
</html>
EOF

    echo "Done! Generated $OUTPUT."
done

echo "All galleries successfully created!"