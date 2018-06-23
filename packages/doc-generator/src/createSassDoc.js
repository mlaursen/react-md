const path = require('path');
const { parse } = require('sassdoc');
const { formatVariable, formatFunction } = require('./sassdocFormats');

module.exports = async function createSassDoc() {
  const rawSassDocs = await parse(path.join(process.cwd(), 'src'));

  return rawSassDocs.reduce((sassdocs, sassdoc) => {
    if (sassdoc.access === 'private') {
      return sassdocs;
    }

    switch (sassdoc.context.type) {
      case 'function':
        sassdocs.functions.push(formatFunction(sassdoc));
        break;
      case 'variable':
        sassdocs.variables.push(formatVariable(sassdoc));
        break;
      case 'mixin':
        sassdocs.mixins.push(formatFunction(sassdoc));
        break;
      default:
    }

    return sassdocs;
  }, { variables: [], functions: [], mixins: [] });
};
