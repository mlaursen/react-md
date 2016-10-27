const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const readFile = Promise.promisify(fs.readFile);
const DEPRECATED = ['FlatButton', 'RaisedButton', 'IconButton', 'FloatingButton', 'CardMedia', 'RadioGroup', 'Sidebar'];

module.exports = function extractReactModules(baseDir, folder) {
  const fullPath = path.join(baseDir, folder);
  return readFile(path.join(fullPath, 'index.js'), 'utf-8').then(source => source.split(/\r?\n/).reduce((exports, line) => {
    if (line.match(/export/)) {
      const module = line.replace(/export (default |{ )?(\w+).*/, '$2');
      if (exports.indexOf(module) === -1 && DEPRECATED.indexOf(module) === -1) {
        exports.push(module);
      }
    }

    return exports;
  }, [])).then(exports => ({ folder, fullPath, exports }));
};
