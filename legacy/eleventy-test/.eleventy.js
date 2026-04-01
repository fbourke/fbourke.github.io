const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("split", (str, separator) => str.split(separator));
  eleventyConfig.addFilter("slice", (arr, start, end) => arr.slice(start, end));
  eleventyConfig.addFilter("join", (arr, separator) => arr.join(separator));

  // Pass CSS through to the build
  eleventyConfig.addPassthroughCopy("./src/css");

  // Nunjucks Async Shortcode for responsive images
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, sizes) {
    if (!alt) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let metadata = await Image(src, {
      widths: [600, 1200, "auto"], // Generate 600px, 1200px, and original width
      formats: ["webp", "jpeg"],   // Generate WebP and JPEG
      urlPath: "/img/",            // Where the images appear in the URL
      outputDir: "./_site/img/",   // Where the images are saved on disk
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    let imageAttributes = {
      alt,
      sizes: sizes || "(max-width: 800px) 100vw, 50vw",
      loading: "lazy",
      decoding: "async",
    };

    // Generates the <picture> tag with srcset
    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
