const transformSassdocVariable = require('./transformSassdocVariable');

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}`: ''}`;
}

module.exports = function transformSassdocFunction(sassdoc) {
  const {
    parameter: parameters,
    require: requires,
    return: returns,
    example: examples,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters
    ? `(${parameters.map(transformParams).join(', ')})`
    : '';

  return Object.assign(transformSassdocVariable(sassdoc), {
    code: `@${type} ${name}${params} {\n${code}\n}`,
    examples,
    parameters,
    requires,
    returns,
  });
};
