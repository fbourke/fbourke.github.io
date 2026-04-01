const fs = require("fs");
const path = require("path");

// Configuration
const photosDir = path.join(__dirname, "../photos");

module.exports = function () {
  // 1. Get all folders inside src/photos
  // If the directory doesn't exist yet, return empty array to prevent crash
  if (!fs.existsSync(photosDir)) return [];

  const galleryFolders = fs
    .readdirSync(photosDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // 2. Build an array of gallery objects
  const galleries = galleryFolders.map((folderName) => {
    const folderPath = path.join(photosDir, folderName);
    
    // Find all images in this folder (jpg, png, webp, jpeg)
    const images = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .map((file) => {
        return {
          src: path.join(folderPath, file),
          name: file,
        };
      });

    // Create a "human readable" title from the folder name (e.g., "my-trip" -> "My Trip")
    const title = folderName
      .replace(/-/g, " ")
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

    return {
      slug: folderName,
      title: title,
      images: images,
    };
  });

  return galleries;
};
