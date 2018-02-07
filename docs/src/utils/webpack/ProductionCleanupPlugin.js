/* eslint-disable class-methods-use-this */
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const rimraf = require('rimraf');

const readFile = Promise.promisify(fs.readFile);

const dist = path.resolve(process.cwd(), 'dist');
const server = path.join(dist, 'server.js');

/**
 * Since I haven't figured out a good way to do the server and client builds yet,
 * the server will also create assets and urls for the icons and svgs. Update the
 * server code to match the client hashes.
 */
module.exports = class ProductionCleanupPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      rimraf('./dist/!(server.js|server.js.map)', (err) => {
        if (err) {
          throw err;
        }

        let spriteHash = '';
        Object.keys(compilation.assets).some((key) => {
          if (key.match(/icon-sprites/)) {
            spriteHash = key.split('.')[1];
          }

          return spriteHash;
        });

        if (!spriteHash) {
          throw new Error('Unable to find a correct sprite hash in the compilation.');
        }

        readFile(server, 'UTF-8')
          .then(file => file.replace(/icon-sprites\.[a-z0-9]{8}/g, `icon-sprites.${spriteHash}`))
          .then(file => new Promise((resolve) => {
            compiler.outputFileSystem.writeFile(server, file, resolve);
          }))
          .then(() => {
            callback();
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  }
};
