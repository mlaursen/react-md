import { uniqBy } from 'lodash/array';
import { BASE_SOURCE_PATH } from 'server/constants';
import formatMarkdown from 'utils/formatMarkdown';
import { createSassDocLink } from './getSassDocLinks';

const MAP_DELIMETER = ': (';
const MIXIN_DELIMITER = '{';
const ELLIPSIS = '\u2026';

function trim(s) {
  return s.replace(/\r?\n/g, '').replace(/ {2}/g, '');
}

function refList(list) {
  return list ? uniqBy(list.map(createSassDocLink), ({ name }) => name) : [];
}

function toOneLineCode(code) {
  let startDelimiter = MIXIN_DELIMITER;
  let endDelimiter = '}';
  if (!code.match(/^(@(mixin|function)|%)/)) {
    endDelimiter = ')';
    startDelimiter = MAP_DELIMETER;
  }

  return `${trim(code.substring(0, code.indexOf(startDelimiter) + startDelimiter.length))} ${ELLIPSIS} ${endDelimiter}`;
}

export function formatVariable(sassdoc) {
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
    code: formatMarkdown(`\`\`\`scss\n${code}\n\`\`\``),
    oneLineCode: formatMarkdown(`\`\`\`scss\n${toOneLineCode(code)}\n\`\`\``),
    description,
    links,
    examples,
    see,
    usedBy,
    path: `${BASE_SOURCE_PATH}/src/scss/${path}`,
  };
}

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}` : ''}`;
}

function transformRequires({ name, type, item: { group } }) {
  return { context: { name, type }, group };
}


export function formatFunction(sassdoc) {
  const {
    parameter: parameters,
    require,
    return: returns,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters
    ? `(${parameters.map(transformParams).join(', ')})`
    : '';

  let requires = [];
  if (require) {
    requires = refList(require.map(transformRequires));
  }

  const fullCode = `@${type} ${name}${params} {${code}}`;
  return {
    ...formatVariable(sassdoc),
    code: formatMarkdown(`\`\`\`scss\n${fullCode}\n\`\`\``),
    oneLineCode: formatMarkdown(`\`\`\`scss\n${toOneLineCode(fullCode)}\n\`\`\``),
    requires,
    returns,
  };
}
