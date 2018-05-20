const build = require('./src/build');
const watch = require('./src/watch');
const updateReadme = require('./src/readme');
const createDocgen = require('./src/createDocgen');

function isArg(a) {
  return process.argv.indexOf(a) !== -1;
}

module.exports = function (isStyleable = true) {
  if (isArg('--watch')) {
    watch();
  } else if (isArg('--readme')) {
    updateReadme({
      toc: !isArg('--no-toc'),
      props: !isArg('--no-props'),
      styles: !isArg('--no-styles'),
    });
  } else if(isArg('--docgen')) {
    createDocgen();
  } else {
    build(isStyleable);
  }
}
