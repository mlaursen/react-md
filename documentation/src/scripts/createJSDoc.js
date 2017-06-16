/* eslint-disable no-console */
import 'babel-polyfill';

import fs from 'fs';
import Promise from 'bluebird';
import { JSDOC_DATABASE } from 'server/constants';

const writeFile = Promise.promisify(fs.writeFile);

import jsdoc from '../../jsdoc.json';

function reduceProperties(props, { name, description, defaultvalue: value, kind }) {
  if (kind === 'member') {
    props.push({
      name,
      description,
      value,
    });
  }

  return props;
}

function reduceParams(params, { name, description, type, optional }) {
  params.push({
    name,
    description,
    type: type.names[0],
    required: !optional,
  });

  return params;
}

(async function createJSDoc() {
  const database = jsdoc.reduce((jsdocs, { name, description, properties, kind, params, returns }) => {
    if (kind === 'constant' && description) {
      jsdocs[name] = {
        name,
        type: kind,
        description,
        properties: properties.reduce(reduceProperties, []),
      };
    } else if (kind === 'function' && (returns && returns.length)) {
      const n = name.replace(/.*\//, '');
      const ret = returns[0];
      jsdocs[n] = {
        name: n,
        type: kind,
        description,
        params: params.reduce(reduceParams, []),
        returns: {
          type: ret.type.names[0],
          description: ret.description,
        },
      };
    }

    return jsdocs;
  }, {});

  await writeFile(JSDOC_DATABASE, JSON.stringify(database), 'UTF-8');
  console.log(`Wrote jsdoc database to \`${JSDOC_DATABASE}\``);
}());
