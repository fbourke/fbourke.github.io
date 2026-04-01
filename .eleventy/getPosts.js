const fs = require('fs');
const path = require('path');

function getPosts() {
  const postsDir = path.join(__dirname, '../posts');
  return fs.readdirSync(postsDir).filter(f => fs.statSync(path.join(postsDir, f)).isDirectory());
}

module.exports = getPosts;
