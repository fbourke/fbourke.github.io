const { readdirSync } = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy({ "img": "img" });
  eleventyConfig.addPassthroughCopy({ "main.css": "main.css" });

  // Gallery shortcode: lists all jpgs in a folder
  eleventyConfig.addShortcode("gallery", function(folder) {
    const dir = path.join("posts", folder);
    let files = [];
    try {
      files = readdirSync(dir).filter(f => f.match(/\.(jpe?g)$/i));
    } catch (e) { return '<!-- No images -->'; }
    return files.map(f => `<img src="/posts/${folder}/${f}" style="max-width:300px;display:block;margin-bottom:1em;">`).join("\n");
  });

  return {
    dir: {
      input: "posts",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
