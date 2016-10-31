const transformSassdocVariable = require('./transformSassdocVariable');

function transformParams({ name, default: value }) {
  return `$${name}${value ? `: ${value}`: ''}`;
}

module.exports = function transformSassdocFunction(sassdoc) {
  const {
    parameter: parameters,
    require: requires,
    return: returns,
    context: { name, type, code },
  } = sassdoc;

  const params = parameters
    ? `(${parameters.map(transformParams).join(', ')})`
    : '';

  return Object.assign(transformSassdocVariable(sassdoc), {
    code: `@${type} ${name}${params} {${code}}`,
    parameters: parameters || [],
    requires,
    returns,
  });
};
