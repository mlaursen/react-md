const copyfiles = require('copyfiles');

/**
 * A simple promisify wrapper around copyfiles to copy all scss files into the dist folder.
 */
module.exports = function copyStyles() {
  return new Promise((resolve, reject) => {
    console.log('Copying scss files into the dist folder...');
    copyfiles(['src/**/*.scss', 'dist'], { up: 1 }, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}
