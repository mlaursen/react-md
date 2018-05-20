const path = require('path');
const chokidar = require('chokidar');
const clean = require('./clean');
const { buildESModules } = require('./compileTypescript');
const createTypescriptDefinitions = require('./createTypescriptDefinitions');
const copyStyles = require('./copyStyles');

function handleTS() {
  buildESModules();
  clean('types').then(createTypescriptDefinitions);
}

module.exports = function watcher() {
  handleTS();
  copyStyles();
  const src = path.join(process.cwd(), 'src');
  console.log('Watching files in directory: "%s"', src);

  const typescriptWatcher = chokidar.watch(['./src/**/*.ts', './src/**/*.tsx'], {
    ignored: /\_\_tests\_\_/,
    persistent: true,
  });
  typescriptWatcher.on('change', handleTS);

  const scssWatcher = chokidar.watch('./src/**/*.scss');
  scssWatcher.on('change', copyStyles);
}
