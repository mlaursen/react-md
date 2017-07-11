/* eslint-disable no-console */
import 'babel-polyfill';
// import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

const LIMIT = 3682;

import sourceData from '../server/airQuality.json';

const writeFile = Promise.promisify(fs.writeFile);
const fileName = path.resolve(process.cwd(), 'src', 'server', 'databases', 'airQuality.json');

async function createAirQualityDB() {
  // const response = await fetch('https://data.cdc.gov/api/views/cjae-szjv/rows.json?accessType=DOWNLOAD')
  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  // const sourceData = await response.json();
  let startIndex = -1;
  const keys = [];
  const { columns } = sourceData.meta.view;
  const meta = columns.reduce((list, { id, name, dataTypeName, position, fieldName }, i) => {
    if (position > 0) { // non-hidden field
      if (startIndex === -1) {
        startIndex = i;
      }

      keys.push(name.substring(0, 1).toLowerCase() + name.substring(1));
      list.push({
        id,
        index: position,
        name: name.split(/(?=[A-Z])/).join(' '),
        numeric: dataTypeName === 'number',
      });
    }

    return list;
  }, [{ id: -1, index: 0, name: 'Index', numeric: true }]);

  const data = [];
  sourceData.data.some((datum, index) => {
    data.push(datum.reduce((formatted, part, i) => {
      if (i >= startIndex) {
        const j = i - startIndex;
        const { numeric } = meta[j + 1];
        formatted[keys[j]] = numeric ? parseInt(part, 10) : part;
      }

      return formatted;
    }, { index: index + 1 }));
    return index > LIMIT;
  });

  await writeFile(fileName, JSON.stringify({ meta, data }), 'utf-8');
  console.log(`Created air quality database at '${fileName}'`);
}

createAirQualityDB();
