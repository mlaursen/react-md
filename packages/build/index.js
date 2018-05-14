/* eslint-disable prefer-destructuring, no-console */
const _ = require('lodash');
const rimraf = require('rimraf');
const copyfiles = require('copyfiles');
const execSync = require('child_process').execSync;

const exec = (command, env) => execSync(command, {
  stdio: 'inherit',
  env: _.assign({}, process.env, env),
});

const command = 'babel src --extensions \'.ts,.tsx,.js,.jsx\' -s -d';

function copyStyles() {
  return new Promise((resolve, reject) => {
    console.log('Copying scss files into the dist folder...');
    copyfiles(['src/**/*.scss', 'dist'], { up: 1 }, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

function buildAll(isStyleable) {
  return new Promise((resolve, reject) => {
    console.log('Cleaning old files...');
    rimraf('+(es|lib|dist|types)', (err) => {
      if (err) {
        reject(err);
      }

      console.log('Compiling files for commonjs...');
      exec(`${command} lib`, {
        BABEL_ENV: 'commonjs',
        NODE_ENV: 'development',
      });

      console.log('\n');
      console.log('Compiling files for ES6 modules...');
      exec(`${command} es`, {
        BABEL_ENV: 'es',
        NODE_ENV: 'development',
      });

      console.log('\n');
      console.log('Creating typescript definition files...');
      exec('tsc -p tsconfig.definitions.json');

      if (!isStyleable) {
        resolve();
        return;
      }

      console.log('\n');
      copyStyles().then(resolve);
    });
  });
};

function watch(target) {
  exec(`${command} ${target} --watch`, {
    BABEL_ENV: target,
    NODE_ENV: 'development',
  });
}

function isArg(a) {
  return process.argv.indexOf(a) !== -1;
}

module.exports = function build(isStyleable = true) {
  if (isArg('--watch')) {
    watch(isArg('--cjs') ? 'commonjs' : 'es');
  } else if (isArg('--copy')) {
    copyStyles();
  } else {
    buildAll(isStyleable);
  }
}
