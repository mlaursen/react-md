const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { spawn } = require('child_process');

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

const watchedProjects = new Set();
const processes = [];
function startTsWatcher(filePath) {
  const [packages, project] = filePath.split(path.sep);
  if (watchedProjects.has(project)) {
    return;
  }

  const tsc = './node_modules/typescript/bin/tsc';
  const tsconfig = path.join(packages, project, 'tsconfig.esmodule.json');
  const args = ['-p', tsconfig, '-w'];

  console.log(`Staring new tsc watcher in ${project}...`);
  processes.push(spawn(tsc, args, { stdio: 'inherit' }));
  if (process.argv.includes('--cjs')) {
    const cjsArgs = args.slice();
    cjsArgs[1] = tsconfig.replace('esmodule', 'commonjs');
    processes.push(spawn(tsc, cjsArgs, { stdio: 'inherit' }));
  }

  watchedProjects.add(project);
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
