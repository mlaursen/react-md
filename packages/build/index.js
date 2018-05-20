const build = require('./src/build');
const watch = require('./src/watch');

function isArg(a) {
  return process.argv.indexOf(a) !== -1;
}

module.exports = function (isStyleable = true) {
  if (isArg('--watch')) {
    watch();
  } else {
    build(isStyleable);
  }
}
