import version from '../Version/version';

const packageJSON = require('../../package.json');
const packageVersion = packageJSON.version;

if (packageVersion !== version) {
  const message = `Version numbers do not match:
- package: ${packageVersion}
- version: ${version}
`;
  throw new Error(message);
}
