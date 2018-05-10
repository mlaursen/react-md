/* eslint-disable prefer-destructuring, no-console */
const _ = require('lodash');
const rimraf = require('rimraf');
const copyfiles = require('copyfiles');
const execSync = require('child_process').execSync;

const exec = (command, env) => execSync(command, {
  stdio: 'inherit',
  env: _.assign({}, process.env, env),
});

module.exports = function build() {
  const command = 'babel src --extensions \'.ts,.tsx,.js,.jsx\' -s -d';
  return new Promise((resolve, reject) => {
    console.log('Cleaning old files...');
    rimraf('+(es|lib|dist)', (err) => {
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

      console.log('\n');
      console.log('Copying scss files into \'./dist\'');
      copyfiles(['src/**/*.scss', 'dist'], { up: 1 }, (err2) => {
        if (err2) {
          reject(err2);
        }

        resolve();
      });
    });
  });
};
