const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const { parse } = require('react-docgen');
const GITHUB_URL = require('../../../package.json').bugs.url.replace('/issues', '');
const transformProp = require('./transformProp');

const readFile = Promise.promisify(fs.readFile);
const CONTAINERS = ['Dialog', 'DatePicker', 'TimePicker', 'Snackbar'];

function isPrivate(s) {
  return s.charAt(0) === '_';
}

module.exports = function createReactDocgen({ folder, fullPath, exports }, customPropTypes) {
  return Promise.all(
    exports.filter(file => !file.match(/FakeInked/)).map(file => {
      const sourcePath = path.join(fullPath, `${file}${CONTAINERS.indexOf(file) !== -1 ? 'Container' : ''}.js`);

      return readFile(sourcePath, 'utf-8')
        .then(source => parse(source.replace(/ComposedComponent => /, '')))
        .then(({ description, methods, props }) => ({
          source: `${GITHUB_URL}/blob/master/src/js/${folder}/${file}.js`,
          component: file,
          description,
          // Remove private methods
          methods: methods.filter(method => !isPrivate(method.name)),

          // Remove private props
          props: Object.keys(props).filter(propName =>
              !isPrivate(propName) && !props[propName].description.match(/@access private/)
          ).map(propName => transformProp(props[propName], propName, customPropTypes)),
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
