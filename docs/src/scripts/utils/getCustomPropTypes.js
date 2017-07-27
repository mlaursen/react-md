import fs from 'fs';
import Promise from 'bluebird';

import { REACT_MD_PROP_TYPES } from 'server/constants';
import isPrivate from './isPrivate';

const readdir = Promise.promisify(fs.readdir);

export default async function getCustomPropTypes() {
  const files = await readdir(REACT_MD_PROP_TYPES);

  return files.reduce((remaining, file) => {
    if (!isPrivate(file)) {
      remaining.push(file.replace('.js', ''));
    }

    return remaining;
  }, ['deprecated', 'requiredForA11y']);
}
