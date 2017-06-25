/* eslint-disable no-console */
import 'babel-polyfill';

import fs from 'fs';
import Promise from 'bluebird';
import pluralize from 'pluralize';
import { kebabCase } from 'lodash/string';
import { NESTED_GROUPS, DOCGEN_DATABASE, PROP_TYPE_DATABASE } from 'server/constants';
import createComponentsDocgen from './utils/createComponentsDocgen';
import getCustomPropTypes from './utils/getCustomPropTypes';
import getDocumentableComponents from './utils/getDocumentableComponents';
import getPropTypeLinks from './utils/getPropTypeLinks';

const writeFile = Promise.promisify(fs.writeFile);

/**
 * Creates the "database" file of all the documentation for the components.
 */
async function createDocgen() {
  const customPropTypes = await getCustomPropTypes();
  const components = await getDocumentableComponents();
  const propTypesDatabase = getPropTypeLinks(components);
  const docgens = await Promise.all(components.map(c => createComponentsDocgen(c, customPropTypes)));

  const database = docgens.reduce((db, { group, docgens }) => {
    if (NESTED_GROUPS.indexOf(group) !== -1) {
      db[group] = docgens.reduce((entry, docgen) => {
        let name = kebabCase(docgen.component);
        if (!name.endsWith('ss')) {
          name = pluralize(name);
        }

        if (name.match(/selection-control-group/)) {
          entry[name.replace(/-group/, '')].push(docgen);
        } else {
          entry[name.replace(/-(pickers|progress)/, '')] = [docgen];
        }

        return entry;
      }, {});
    } else {
      db[group] = docgens;
    }

    return db;
  }, {});

  await writeFile(DOCGEN_DATABASE, JSON.stringify(database), 'UTF-8');
  console.log(`Wrote docgen database to \`${DOCGEN_DATABASE}\``);

  await writeFile(PROP_TYPE_DATABASE, JSON.stringify(propTypesDatabase), 'UTF-8');
  console.log(`Wrote docgen database to \`${PROP_TYPE_DATABASE}\``);
}

createDocgen();
