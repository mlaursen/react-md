const fs = require('fs');
const path = require('path');
const updateTOC = require('./updateTOC');
const updatePropTypes = require('./updatePropTypes');
const createSassDoc = require('./createSassDoc');

module.exports = async function updateReadme({ toc = true, proptypes = true, sassdoc = false } = {}) {
  const readmePath = path.join(process.cwd(), 'README.md');
  const oldReadme = fs.readFileSync(readmePath, 'utf-8');

  let readme = oldReadme;
  if (proptypes) {
    console.log('Updating the prop types...');
    readme = updatePropTypes(readme);
  }

  if (sassdoc) {
    console.log('Updating the SassDoc...');
    console.log(await createSassDoc());
  }

  if (toc) {
    console.log('Updating the table of contents...');
    readme = updateTOC(readme);
  }

  fs.writeFileSync(readmePath, readme, 'utf-8');
};
