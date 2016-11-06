const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const access = Promise.promisify(fs.access);
const mkdir = Promise.promisify(fs.mkdir);
const fsWrite = Promise.promisify(fs.writeFile);

function folderExists(name) {
  return access(name, fs.constants.F_OK).then(() => true).catch(() => false);
}

/**
 * A simple wrapper that will write a file into a folder but create the folder
 * if it does not already exist.
 *
 * @param {String} name - The file name to write as.
 * @param {String} folder - The folder's full path.
 * @param {String|Buffer} data - The data to write into the file.
 * @return {Promise} a promise
 */
module.exports = function writeFile(name, folder, data) {
  return folderExists(folder).then(exists => {
    if (exists) {
      return true;
    }

    return mkdir(folder);
  }).then(() => fsWrite(path.join(folder, name), data, 'utf8'));
};
