import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

const JS_FOLDER = path.resolve(process.cwd(), '..', 'src', 'js');
const DEPRECATED = ['FlatButton', 'RaisedButton', 'IconButton', 'FloatingButton', 'CardMedia', 'RadioGroup', 'Sidebar'];
const readdir = Promise.promisify(fs.readdir);
const readFile = Promise.promisify(fs.readFile);

async function extractReactComponents(baseDir, folder) {
  const fullPath = path.join(baseDir, folder);
  const lines = (await readFile(path.join(fullPath, 'index.js'), 'utf-8')).split(/\r?\n/);

  const components = lines.reduce((exports, line) => {
    if (line.match(/export/)) {
      const module = line.replace(/export (default |{ )?(\w+).*/, '$2');
      if (exports.indexOf(module) === -1 && DEPRECATED.indexOf(module) === -1) {
        exports.push(module);
      }
    }

    return exports;
  }, []);

  return { folder, fullPath, components };
}

export default async function findDocgenComponents() {
  const folders = (await readdir(JS_FOLDER))
    .filter(file => file.match(/^(?!(Transitions|FAB|Sidebar))[A-Z]/));

  return await Promise.all(folders.map(folder => extractReactComponents(JS_FOLDER, folder)));
}
