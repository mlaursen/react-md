/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { flattenDeep, kebabCase } from 'lodash';
import { singular } from 'pluralize';

import { EXAMPLES_LINKS_DATABASE } from 'server/constants';

const writeFile = Promise.promisify(fs.writeFile);
const readFile = Promise.promisify(fs.readFile);
const readdir = Promise.promisify(fs.readdir);
const lstat = Promise.promisify(fs.lstat);

const baseDir = path.resolve(process.cwd(), 'src', 'components', 'Components');
const EXAMPLES = 'const examples = ';

function removeSlash(str) {
  return str.substring(str.indexOf('/') + 1);
}

async function getDirectories(pathname) {
  return readdir(pathname).filter(async (name) => {
    const stats = await lstat(path.join(pathname, name));
    return stats.isDirectory();
  });
}

async function woop() {
  const baseFolders = await getDirectories(baseDir);
  const allComponents = await Promise.all(baseFolders.map(async (folder) => {
    if (folder.match(/Helpers|Progress|Pickers/)) {
      const subfolders = await getDirectories(path.join(baseDir, folder));
      return subfolders.map(subfolder => `${folder}${path.sep}${subfolder}`);
    }

    return folder;
  }));
  const components = flattenDeep(allComponents);
  const examples = await Promise.all(components.map(async (component) => {
    let removeUntilMatching = false;
    const source = await readFile(path.join(baseDir, component, 'index.jsx'), 'UTF-8');
    const examplesStart = source.substring(source.indexOf(EXAMPLES) + EXAMPLES.length);
    const examplesString = examplesStart.substring(0, examplesStart.indexOf('}];') + 2)
      .split(/\r?\n/)
      .reduce((examples, line) => {
        if (removeUntilMatching) {
          if (line.match(/^\s{2}`,/)) {
            removeUntilMatching = false;
          }

          return examples;
        } else if (line.match(/^\s{2}(code|children): /)) {
          removeUntilMatching = !!line.match(/code: `/);
          return examples;
        }

        return `${examples}\n${line}`;
      }, '');

    return { component, examples: eval(examplesString) }; // eslint-disable-line no-eval
  }));

  const allLinks = flattenDeep(examples.map(({ component, examples }) => examples.map(({ title, description }) => {
    const section = kebabCase(component).replace(/(helpers|pickers|progress)-/, '$1/');
    let type = component;
    if (type.match(/pickers/i)) {
      type = `${removeSlash(type)}Picker`;
    } else if (type.match(/progress/i)) {
      type = `${removeSlash(type)}Progress`;
    } else if (type.match(/helpers/i)) {
      type = removeSlash(type);
    } else {
      type = singular(type);
    }

    return {
      name: title,
      type: `${type} Example`,
      description: description || '',
      ref: `/components/${section}#${kebabCase(title)}`,
    };
  })));

  await writeFile(EXAMPLES_LINKS_DATABASE, JSON.stringify(allLinks), 'utf-8');
  console.log(`Wrote example links database to \`${EXAMPLES_LINKS_DATABASE}\``);
}
woop();
