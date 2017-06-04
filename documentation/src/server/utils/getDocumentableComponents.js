import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { REACT_MD_JS } from 'server/constants';

const DEPRECATED = [
  'FlatButton',
  'RaisedButton',
  'IconButton',
  'FloatingButton',
  'CardMedia',
  'RadioGroup',
  'Sidebar',
];

const readdir = Promise.promisify(fs.readdir);
const readFile = Promise.promisify(fs.readFile);

/**
 * Creates an object containing the component's folder (section), the fullPath
 * to that folder, and a list of component file names in that folder.
 *
 */
async function makeDocumentableObject(folder) {
  const fullPath = path.join(REACT_MD_JS, folder);
  const contents = await readFile(path.join(fullPath, 'index.js'), 'UTF-8');

  const components = contents.split(/\r?\n/).reduce((exports, line) => {
    // go line-by-line in the src/js/SECTION/index.js file to get a list of the exported
    // components in this section
    if (line.match(/export/)) {
      const component = line.replace(/export (default |{ )?(\w+).*/, '$2');
      if (exports.indexOf(component) === -1 && DEPRECATED.indexOf(component) === -1 && component.indexOf('FakeInked') === -1) {
        exports.push(component);
      }
    }

    return exports;
  }, []);

  return { folder, components, fullPath };
}


export default async function getDocumentableComponents() {
  const folders = (await readdir(REACT_MD_JS))
    .filter(folder => folder.match(/^(?!(Transitions|FAB|Sidebar))[A-Z]/));

  return await Promise.all(folders.map(makeDocumentableObject));
}
