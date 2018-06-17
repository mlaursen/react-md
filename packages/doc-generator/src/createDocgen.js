const fs = require('fs');
const path = require('path');
const typescriptDocgen = require('react-docgen-typescript');

function parseLine(exports, line) {
  const exportedName = line.replace(/.+"\.\/(\w+)";$/, 'src/$1.tsx');
  if (exportedName && exports.indexOf(exportedName) === -1) {
    exports.push(exportedName);
  }

  return exports;
}

function findExports() {
  const src = path.join(process.cwd(), 'src');
  const main = path.join(src, 'index.ts');
  const contents = fs.readFileSync(main, 'UTF-8');
  return contents.split(/\r?\n/).reduce((list, line) => parseLine(list, line, src), []);
}

module.exports = function createDocgen() {
  const tsconfig = path.join(process.cwd(), 'tsconfig.json');
  const parser = typescriptDocgen.withCustomConfig(tsconfig).parse;
  return findExports().map((fileName) => parser(fileName)[0]);
}
