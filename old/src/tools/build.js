const fs = require('fs');
const execSync = require('child_process').execSync;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const exec = (command, env) => execSync(command, {
  stdio: 'inherit',
  env: Object.assign({}, process.env, env),
});

console.log('\nBuilding react-md.js ...');
exec('rollup -c', {
  NODE_ENV: 'development',
  BABEL_ENV: 'umd',
});

console.log('\nBuilding react-md.min.js ...');
exec('rollup -c', {
  NODE_ENV: 'production',
  BABEL_ENV: 'umd',
});

const size = gzipSize.sync(fs.readFileSync('dist/react-md.min.js'));
console.log('\n\ngzipped, the UMD build is %s', prettyBytes(size));
