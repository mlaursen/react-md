const fs = require('fs');
const path = require('path');
const updateTOC = require('./updateTOC');
const updatePropTypes = require('./updatePropTypes');

module.exports = function updateReadme(options) {
  const { toc = true, props = true, styles = false } = options || {};
  const readmePath = path.join(process.cwd(), 'README.md');
  const oldReadme = fs.readFileSync(readmePath, 'utf-8');

  let readme = oldReadme;
  if (props) {
    console.log('Updating the prop types...');
    readme = updatePropTypes(readme);
  }

  if (toc) {
    console.log('Updating the table of contents...');
    readme = updateTOC(readme);
  }

  fs.writeFileSync(readmePath, readme, 'utf-8');
}
