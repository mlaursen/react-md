// import { uniqBy } from 'lodash/array';

const MAP_DELIMETER = ': (';
const MIXIN_DELIMITER = '{';
const ELLIPSIS = '\u2026';

function trim(s) {
  return s.replace(/\r?\n/g, '').replace(/ {2}/g, '');
}

function toOneLineCode(code) {
  if (!code.match(/\r?\n/)) {
    return code;
  }

  let startDelimiter = MIXIN_DELIMITER;
  let endDelimiter = '}';
  if (!code.match(/^(@(mixin|function)|%)/)) {
    endDelimiter = ')';
    startDelimiter = MAP_DELIMETER;
  }

  return `${trim(code.substring(0, code.indexOf(startDelimiter) + startDelimiter.length))} ${ELLIPSIS} ${endDelimiter}`;
}

function formatVariable(sassdoc) {
  const {
    context: { name, type, value, scope },
    description,
    // file: { path },
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

  // let { see, usedBy } = sassdoc;
  // see = refList(see);
  // usedBy = refList(usedBy);

  return {
    name,
    type,
    variableType,
    code,
    oneLineCode: toOneLineCode(code),
    description,
    links,
    examples,
    // see,
    // usedBy,
    // path: `${BASE_SOURCE_PATH}/src/scss/${path}`,
  };
}

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}` : ''}`;
}

// function transformRequires({ name, type, item: { group } }) {
//   return { context: { name, type }, group };
// }

function formatFunction(sassdoc) {
  const {
    parameter: parameters,
    // require,
    return: returns,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters ? `(${parameters.map(transformParams).join(', ')})` : '';

  const requires = [];
  // if (require) {
  //   requires = refList(require.map(transformRequires));
  // }

  const fullCode = `@${type} ${name}${params} {${code}}`;
  return {
    ...formatVariable(sassdoc),
    code: fullCode,
    oneLineCode: toOneLineCode(fullCode),
    parameters: parameters || [],
    requires,
    returns,
  };
}

module.exports.formatVariable = formatVariable;
module.exports.formatFunction = formatFunction;
