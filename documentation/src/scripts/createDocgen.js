#!/usr/bin/env node
import 'babel-polyfill';

import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import createComponentsDocgen from 'server/utils/createComponentsDocgen';
import getCustomPropTypes from 'server/utils/getCustomPropTypes';
import getDocumentableComponents from 'server/utils/getDocumentableComponents';

const writeFile = Promise.promisify(fs.writeFile);

async function createDocgen() {
  const customPropTypes = await getCustomPropTypes();
  const components = await getDocumentableComponents();
  const docgens = await Promise.all(components.map(c => createComponentsDocgen(c, customPropTypes)));

  const fileName = path.resolve(process.cwd(), 'src', 'server', 'api', 'docgens', 'database.json');
  await writeFile(fileName, JSON.stringify(docgens), 'UTF-8');
  console.log(`Created \`${fileName}\``);
}

createDocgen();
