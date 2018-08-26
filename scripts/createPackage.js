const fs = require('fs-extra');
const path = require('path');

const createPackageJson = require('./createPackageJson');
const createReadme = require('./createReadme');
const createScssFiles = require('./createScssFiles');
const createTypescriptFiles = require('./createTypescriptFiles');

function createFile(fileName, contents) {
  if (typeof contents !== 'string') {
    contents = JSON.stringify(contents, null, 2);
  }

  return fs.outputFile(fileName, contents);
}

module.exports = function createPackage(config) {
  const {
    name,
    description,
    version,
    isPrivate,
    styles,
    sassdoc,
    typescript,
    propTypes,
    customTypes,
  } = config;
  const root = path.join(process.cwd(), 'packages', name);
  const src = path.join(root, 'src');

  const filesToCreate = {
    [path.join(root, 'package.json')]: createPackageJson({
      name,
      description,
      version,
      isPrivate,
      styles,
      sassdoc,
      typescript,
      propTypes,
    }),
    [path.join(root, 'README.md')]: createReadme({ name, description, sassdoc, propTypes }),
    ...createScssFiles(name, src, styles),
    ...createTypescriptFiles(root, src, typescript, customTypes),
  };

  const filesToCopy = {
    [path.join(root, 'LICENSE')]: path.join(process.cwd(), 'LICENSE'),
  };

  console.log('Creating basic folder structure and files...');
  fs.removeSync(root);
  fs.ensureDirSync(src);

  Promise.all([
    ...Object.keys(filesToCreate).map(fileName => createFile(fileName, filesToCreate[fileName])),
    ...Object.keys(filesToCopy).map(fileName => fs.copy(filesToCopy[fileName], fileName)),
  ]).then(() => {
    console.log('Done!');
  });
};
