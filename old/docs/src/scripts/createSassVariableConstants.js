import fs from 'fs';
import path from 'path';
import Bluebird from 'bluebird';
import { findIndex } from 'lodash';

const readFile = Bluebird.promisify(fs.readFile);
const writeFile = Bluebird.promisify(fs.writeFile);
const COLORS = path.resolve(process.cwd(), '..', 'src', 'scss', '_colors.scss');
const COLOR_CONSTANTS = path.resolve(process.cwd(), 'src', 'constants', 'scssColors.js');

const LAST_VARIABLE_REGEX = /^\$md-light-theme-colors/;
const VARIABLE_REGEX = /^\$md-(?!color-map|(colors-(warn|include)))/;
const EXISTING_VARIABLE_REGEX = /:.+(\$md(-\w+)+)/;

readFile(COLORS, 'utf8')
  .then(colors => colors.split(/\r?\n/))
  .then((lines) => {
    const variables = [];
    const complexVariables = [];
    lines.some((line) => {
      if (LAST_VARIABLE_REGEX.test(line)) {
        return true;
      } else if (VARIABLE_REGEX.test(line)) {
        const [name, value] = line.split(': ');
        const list = EXISTING_VARIABLE_REGEX.test(line) ? complexVariables : variables;
        list.push({ name, value: value.replace(/;| !default/, '') });
      }

      return false;
    });
    return { complexVariables, variables };
  }).then(({ variables, complexVariables }) => complexVariables.reduce((combined, { name, value }) => {
    const v = value.replace(/(\$md(-\w+)+)/g, (_, vari) => {
      const i = findIndex(combined, ({ name }) => name === vari);
      if (i !== -1) {
        return combined[i].value;
      }

      throw new Error(`Variable \`${vari}\` was found but now value exists yet.`);
    });

    combined.push({ name, value: v.replace(';', '') });
    return combined;
  }, [...variables]))
  .then(variables => `/* eslint-disable */
/* THIS IS A GENERATED FILE. RUN "yarn colors" TO UPDATE */
export default ${JSON.stringify(variables, null, 2)}`)
  .then(fileContents => writeFile(COLOR_CONSTANTS, fileContents, 'utf8'))
  .then(() => {
    console.log(`Created '${COLOR_CONSTANTS}'`);
  });
