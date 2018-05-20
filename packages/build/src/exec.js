const _ = require('lodash');
const execAsync = require('child_process').exec;

module.exports = function exec(command, env) {
  return new Promise((resolve, reject) => {
    execAsync(command, {
      stdio: 'inherit',
      env: _.assign({}, process.env, env),
    }, function handle(error) {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}
