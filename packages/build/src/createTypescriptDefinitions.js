const exec = require('./exec');

module.exports = function createTypescriptDefinitions() {
  console.log('Creating typescript definition files...');
  return exec('tsc -p tsconfig.definitions.json');
}
