/* eslint-disable no-console */
import 'babel-polyfill';

import fs from 'fs';
import Promise from 'bluebird';
import { parse } from 'sassdoc';
import { REACT_MD_SCSS, SASSDOC_DATABASE, SASSDOC_LINKS_DATABASE } from 'server/constants';
import { formatVariable, formatFunction } from './utils/sassdocFormats';
import getSassDocLinks from './utils/getSassDocLinks';

const writeFile = Promise.promisify(fs.writeFile);

async function createSassDoc() {
  const sassdocs = (await parse(REACT_MD_SCSS)).filter(({ access }) => access !== 'private');
  const linksDatabase = getSassDocLinks(sassdocs);
  const database = sassdocs.reduce((db, sassdoc) => {
    // A sassdoc group is an array of a single element since I don't know how to configure it
    // properly for multiple groups. A group will be multiple if it contains ', ' in the name.
    sassdoc.group[0].split(', ').forEach((group) => {
      if (!db[group]) {
        db[group] = {
          placeholders: [],
          variables: [],
          functions: [],
          mixins: [],
        };
      }

      const entry = db[group];
      switch (sassdoc.context.type) {
        case 'placeholder':
          entry.placeholders.push(formatVariable(sassdoc));
          break;
        case 'function':
          entry.functions.push(formatFunction(sassdoc));
          break;
        case 'variable':
          entry.variables.push(formatVariable(sassdoc));
          break;
        case 'mixin':
          entry.mixins.push(formatFunction(sassdoc));
          break;
        default:
          // Do nothing
      }
    });
    return db;
  }, {});

  await writeFile(SASSDOC_DATABASE, JSON.stringify(database), 'UTF-8');
  console.log(`Wrote docgen database to \`${SASSDOC_DATABASE}\``);

  await writeFile(SASSDOC_LINKS_DATABASE, JSON.stringify(linksDatabase), 'UTF-8');
  console.log(`Wrote docgen database to \`${SASSDOC_LINKS_DATABASE}\``);
}

createSassDoc();
