const path = require('path');
const {
  JEST_CONFIG_TEMPLATE,
  JEST_SETUP_TEMPLATE,
  TSCONFIG_COMMONJS_TEMPLATE,
  TSCONFIG_TEMPLATE,
  TSCONFIG_TEST_TEMPLATE,
  TSLINT_TEMPLATE,
} = require('./constants');

module.exports = function createTypescriptFiles(root, src, typescript, types) {
  if (!typescript) {
    return;
  }

  const files = {
    [path.join(root, 'jest.config.js')]: JEST_CONFIG_TEMPLATE,
    [path.join(root, 'jest.setup.js')]: JEST_SETUP_TEMPLATE,
    [path.join(root, 'tsconfig.commonjs.json')]: TSCONFIG_COMMONJS_TEMPLATE,
    [path.join(root, 'tsconfig.json')]: TSCONFIG_TEMPLATE,
    [path.join(root, 'tsconfig.test.json')]: TSCONFIG_TEST_TEMPLATE,
    [path.join(root, 'tslint.json')]: TSLINT_TEMPLATE,
    [path.join(src, 'index.ts')]: `${types ? 'export * from \'./types\';\n' : ''}`,
  };

  if (types) {
    files[path.join(src, 'types.d.ts')] = '';
  }

  return files;
};
