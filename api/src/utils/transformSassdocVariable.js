import { uniqBy } from 'lodash/array';
import { buildSassDocLink } from './buildSassDocList';

const GITHUB_URL = require('../../../package.json').bugs.url.replace('/issues', '');

export function refList(list) {
  return list ? uniqBy(list.map(buildSassDocLink), ({ name }) => name) : [];
}

export default function transformSassdocVariable(sassdoc) {
  const {
    context: {
      name,
      type,
      value,
      scope,
    },
    description,
    file: { path },
    type: variableType,
    example: examples,
    link: links,
  } = sassdoc;

  let { code } = sassdoc.context;

  if (!code) {
    code = `$${name}: ${value}${scope === 'default' ? ' !default' : ''};`;
  } else if (type === 'placeholder') {
    code = `%${name} {${code}}`;
  }

  let { see, usedBy } = sassdoc;
  see = refList(see);
  usedBy = refList(usedBy);

  return {
    name,
    type,
    variableType,
    code,
    description,
    links,
    examples,
    see,
    usedBy,
    path: `${GITHUB_URL}/blob/master/src/scss/${path}`,
  };
}
