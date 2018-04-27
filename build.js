const assign = require('object.assign');
const childProcess = require('child_process');

const compile = 'babel src -x \'.ts,.tsx,.js,.jsx\' -o';

const exec = (command, env) => new Promise((resolve, reject) => {
  childProcess.exec(command, {
    stdio: 'inherit',
    env: assign({}, process.env, env),
  }, function (error) {
    console.log('error:', error);
    if (error) {
      reject(error);
      return;
    }

    resolve();
  });
});

const isNode = ['commonjs', 'test', 'node'].some((key) => process.env.BABEL_ENV === key);

const dist = isNode ? 'lib' : 'es';

Promise.all([
  exec(`${compile} ${dist}`),
]);
