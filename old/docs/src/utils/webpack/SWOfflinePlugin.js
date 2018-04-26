const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const { transform } = require('babel-core');
const UglifyJS = require('uglify-js');

const readFile = Promise.promisify(fs.readFile);

/**
 * This is a plugin to create and minify the offline service worker importScript
 * that is used by the main SWPrecachePlugin.
 */
module.exports = class SWOfflinePlugin {
  constructor(options) {
    this.options = options;
    this.config = {};
  }

  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      this.configure(compiler);

      this.write(compiler)
        .then(() => callback())
        .catch(error => callback(error));
    });
  }

  configure(compiler) {
    const { cacheId, entry, filename } = this.options;
    const { filepath = path.resolve(compiler.outputPath, filename) } = this.options;
    this.config = {
      cacheId,
      entry,
      filename,
      filepath,
      babel: {
        babelrc: false,
        presets: [
          ['env', {
            targets: {
              browsers: ['last 2 versions', 'safari >= 7'],
            },
          }],
        ],
      },
    };
  }

  write(compiler) {
    return readFile(this.config.entry, 'UTF-8')
      .then(code => code.replace(/__CACHE_ID__/, this.config.cacheId))
      .then(code => transform(code, this.config.babel).code)
      .then(code => UglifyJS.minify(code).code)
      .then(code => new Promise((resolve) => {
        compiler.outputFileSystem.writeFile(this.config.filepath, code, resolve);
      }));
  }
};
