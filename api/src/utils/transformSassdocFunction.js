const transformSassdocVariable = require('./transformSassdocVariable');

module.exports = function transformSassdocFunction(sassdoc) {
  const {
    parameter: parameters,
    require: requires,
    return: returns,
    example: examples,
  } = sassdoc;

  return Object.assign(transformSassdocVariable(sassdoc), {
    examples,
    parameters,
    requires,
    returns,
  });
};
