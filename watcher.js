const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { spawn, exec } = require('child_process');

const IGNORED = /(\_\_tests\_\_|dev-utils|examples)/;
let startLoggingScss = false;
let startLoggingDefs = false;

function copyFile(filePath, destPath, log) {
  const destWithSep = `${path.sep}${destPath}`;
  const dest = filePath.replace(
    `${path.sep}src${path.sep}`,
    `${destWithSep}${path.sep}`
  );
  const destFolderPath = dest.substring(
    0,
    dest.indexOf(destWithSep) + destWithSep.length
  );

  if (!fs.existsSync(destFolderPath)) {
    fs.mkdirSync(destFolderPath);
  }

  if (log) {
    console.log(`${filePath} -> ${dest}`);
  }

  fs.copyFileSync(filePath, dest);
}

const copyScssFile = f => copyFile(f, 'dist', startLoggingScss);
const copyDefinitionFile = f => copyFile(f, 'types', startLoggingDefs);
const isNotLazy = process.argv.includes('--no-lazy');
const isVariablesWatched = process.argv.includes('--watch-variables');

const watchedProjects = new Set();
const processes = [];

function tscWatcher(filePath, extension = '') {
  const [packages, project] = filePath.split(path.sep);
  const tsc = path.join(
    process.cwd(),
    'node_modules',
    'typescript',
    'bin',
    'tsc'
  );
  const tsConfig = path.join(packages, project, `tsconfig${extension}.json`);
  const args = ['-p', tsConfig, '-w'];

  processes.push(spawn(tsc, args, { stdio: 'inherit' }));
}

function startTsWatcher(filePath) {
  const [, project] = filePath.split(path.sep);
  if (watchedProjects.has(project)) {
    return;
  }

  console.log(`Staring new tsc watcher in ${project}...`);
  tscWatcher(filePath);
  if (process.argv.includes('--cjs')) {
    tscWatcher(filePath, '.commonjs');
  }

  watchedProjects.add(project);
}

function startVariablesWatcher(filePath) {
  const [, project] = filePath.split(path.sep);
  const name = `${project}-variables`;
  const args = [
    'run',
    'build',
    '--scope',
    `@react-md/${project}`,
    '--',
    '--variables-only',
  ];

  spawn('lerna', args, { stdio: 'inherit' });
  if (watchedProjects.has(name)) {
    return;
  }

  tscWatcher(filePath, '.variables');
}

chokidar
  .watch('packages/*/src/**/*.scss', { ignored: IGNORED })
  .on('add', filePath => {
    copyScssFile(filePath);
    if (
      isVariablesWatched &&
      isNotLazy &&
      filePath.includes('variables.scss')
    ) {
      startVariablesWatcher(filePath);
    }
  })
  .on('change', filePath => {
    copyScssFile(filePath);
    if (isVariablesWatched && filePath.includes('variables.scss')) {
      startVariablesWatcher(filePath);
    }
  })
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
    ignored: new RegExp(IGNORED.source + '|.d.ts|scssVariables.ts'),
  })
  .on('add', filePath => {
    if (isNotLazy) {
      startTsWatcher(filePath);
    }
  })
  .on('change', startTsWatcher)
  .on('ready', () => {
    console.log('Watching for typescript changes...');
  });

process.on('exit', () => {
  processes.forEach(proc => {
    proc.kill('SIGINT');
  });
});
