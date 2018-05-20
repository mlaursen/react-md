const clean = require('./clean');
const { buildCommonJS, buildESModules } = require('./compileTypescript');
const createTypescriptDefinitions = require('./createTypescriptDefinitions');
const copyStyles = require('./copyStyles');

module.exports = function build(isStyleable) {
  console.log('Cleaning old files...');
  return clean('+(es|lib|dist|types)')
    .then(buildCommonJS)
    .then(buildESModules)
    .then(createTypescriptDefinitions)
    .then(() => {
      if (!isStyleable) {
        return null;
      }

      return copyStyles();
    });
}
