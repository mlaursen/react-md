import version from "../components/Version/version";

// tslint:disable-next-line:no-var-requires
const packageJSON = require("../../package.json");

const packageVersion = packageJSON.version;

if (packageVersion !== version) {
  const message = `Version numbers do not match:
- package: ${packageVersion}
- version: ${version}
`;
  throw new Error(message);
}
