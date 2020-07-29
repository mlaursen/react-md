const { accessSync, constants, chmodSync, existsSync } = require('fs');
const { join } = require('path');

const cli = join('bin', 'cli.js');
if (existsSync(cli)) {
  try {
    accessSync(cli, constants.X_OK);
  } catch (e) {
    console.log(`chmod +x ${cli}`);
    chmodSync(cli, 0o755);
  }
}
