const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const { parse } = require('react-docgen');

const readFile = Promise.promisify(fs.readFile);
const CONTAINERS = ['Dialog', 'DatePicker', 'TimePicker'];

function isPrivate(s) {
  return s.charAt(0) === '_';
}

module.exports = function createReactDocgen({ folder, fullPath, exports }) {
  return Promise.all(
    exports.filter(file => !file.match(/FakeInked/)).map(file => {
      const sourcePath = path.join(fullPath, `${file}${CONTAINERS.indexOf(file) !== -1 ? 'Container' : ''}.js`);
      return readFile(sourcePath, 'utf-8')
        .then(source => parse(source.replace(/ComposedComponent => /, '')))
        .then(({ description, methods, props }) => ({
          source: sourcePath,
          component: file,
          description,
          // Remove private methods
          methods: methods.filter(method => !isPrivate(method.name)),

          // Remove private props
          props: Object.keys(props).filter(propName =>
              !isPrivate(propName) && !props[propName].description.match(/@access private/)
          ).map(propName => ({ [propName]: props[propName] })),
        })).catch(err => {
          console.log('Unable to parse component: ', file);
          throw err;
        });
    })
  ).then(docgens => ({
    docgens,
    group: folder.split(/(?=[A-Z])/).join('-').toLowerCase(),
  }));
};
