const rimraf = require('rimraf');

/**
 * A simple promisify wrapper around rimraf.
 */
module.exports = function clean(files) {
  return new Promise((resolve, reject) => {
    rimraf(files, function (error) {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}
