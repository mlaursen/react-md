import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { parse } from 'react-docgen';
import transformProp from './transformProp';
import isPrivate from './isPrivate';
import { bugs } from '../../../package.json';

const GITHUB_URL = bugs.url.replace('/issues', '');

const readFile = Promise.promisify(fs.readFile);
const CONTAINERS = ['DatePicker', 'TimePicker', 'Snackbar'];

/**
 * Creates an object containing a list of docgens for a grouping of components.
 * This will filter out any private methods or props on a component and transform the
 * docgen into a usable output for the client.
 *
 * @param {Object} componentGroup - An object containing the folder, full path, and list of components for a grouping (Ex: List).
 * @param {String} componentGroup.folder - The folder for the overall grouping.
 * @param {String} componentGroup.fullPath - The full path for the grouping's folder.
 * @param {Array.<String>} componentGroup.components - The list of components in a grouping.
 * @return {Object} AN object containing a list of docgens and the grouping.
 */
export default function createReactDocgen({ folder, fullPath, components }, customPropTypes) {
  return Promise.all(components.filter(file => !file.match(/FakeInked/)).map(file => {
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
        props: Object.keys(props).filter(propName => !isPrivate(propName) && !props[propName].description.match(/@access private/))
          .map(propName => transformProp(props[propName], propName, customPropTypes, file)),
      })).catch(err => {
        console.log('Unable to parse component: ', file);
        throw err;
      });
  })).then(docgens => ({
    docgens,
    group: folder.split(/(?=[A-Z])/).join('-').toLowerCase(),
  }));
}
