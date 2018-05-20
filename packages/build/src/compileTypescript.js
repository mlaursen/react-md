const exec = require('./exec');

const BABEL_COMMAND = 'babel src --extensions \'.ts,.tsx,.js,.jsx\' -s -d';

function buildCommonJS() {
  console.log('Compiling files for commonjs...');
  return exec(`${BABEL_COMMAND} lib`, {
    BABEL_ENV: 'commonjs',
    NODE_ENV: 'development',
  });
}

function buildESModules() {
  console.log('Compiling files for ES6 modules...');
  return exec(`${BABEL_COMMAND} es`, {
    BABEL_ENV: 'es',
    NODE_ENV: 'development',
  });
}

function watchESModules() {
  return exec(`${BABEL_COMMAND} es --watch`, {
    BABEL_ENV: 'es',
    NODE_ENV: 'development',
  });
}

module.exports.buildCommonJS = buildCommonJS;
module.exports.buildESModules = buildESModules;
module.exports.watchESModules = watchESModules;
