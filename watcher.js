const fs = require('fs-extra');
const path = require('path');
const chokidar = require('chokidar');
const { spawn } = require('child_process');

const IGNORED = /(\_\_tests\_\_|dev-utils)/;
let startLoggingScss = false;
let startLoggingDefs = false;

function copyFile(filePath, destPath, log) {
  const dest = filePath.replace(
    `${path.sep}src${path.sep}`,
    `${path.sep}${destPath}${path.sep}`
  );

  if (log) {
    console.log(`${filePath} -> ${dest}`);
  }

  fs.copy(filePath, dest);
}

const copyScssFile = f => copyFile(f, 'dist', startLoggingScss);
const copyDefinitionFile = f => copyFile(f, 'types', startLoggingDefs);

const watchedProjects = new Map();
function startTsWatcher(filePath) {
  const [packages, project] = filePath.split(path.sep);
  if (watchedProjects.has(project)) {
    return;
  }

  const tsc = './node_modules/typescript/bin/tsc';
  const args = [
    '-p',
    path.join(packages, project, 'tsconfig.esmodule.json'),
    '-w',
  ];

  console.log(`Staring new tsc watcher in ${project}...`);
  watchedProjects.set(project, spawn(tsc, args, { stdio: 'inherit' }));
}

chokidar
  .watch('packages/*/src/**/*.scss', { ignored: IGNORED })
  .on('add', copyScssFile)
  .on('change', copyScssFile)
  .on('ready', () => {
    console.log('Watching for scss file changes...');
    startLoggingScss = true;
  });

chokidar
  .watch('packages/*/src/**/*.d.ts', {
    ignored: IGNORED,
  })
  .on('add', copyDefinitionFile)
  .on('change', copyDefinitionFile)
  .on('ready', () => {
    console.log('Watching for typescript definition changes...');
    startLoggingDefs = true;
  });

chokidar
  .watch(['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'], {
    ignored: new RegExp(IGNORED.source + '|.d.ts'),
  })
  .on('change', startTsWatcher)
  .on('ready', () => {
    console.log('Watching for typescript changes...');
  });
