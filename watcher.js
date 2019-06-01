/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { spawn, spawnSync } = require('child_process');

const docsRoot = path.join(process.cwd(), 'packages', 'documentation');
const IGNORED = /(__tests__|dev-utils|documentation)/;

const processes = [];

let startLoggingScss = false;
let startLoggingDefs = false;

const PACKAGES = fs
  .readdirSync('packages')
  .filter(n => !/documentation|dev-utils/.test(n));

const TYPESCRIPT_PACKAGES = PACKAGES.filter(
  n => !/elevation|react-md|material-icons/.test(n)
);

(function tsc() {
  let packages = TYPESCRIPT_PACKAGES;
  if (process.argv.includes('--filter')) {
    const i = process.argv.indexOf('--filter');
    const args = process.argv.slice(i + 1);
    const end = args.findIndex(a => a.startsWith('--'));
    const filters = args.slice(0, end === -1 ? args.length : end);
    const regex = new RegExp(filters.join('|'));
    packages = packages.filter(n => regex.test(n));
  }
  const watchablePackages = packages.map(n => path.join('packages', n));
  console.log('Starting tsc in lazy mode for the following packages...');
  console.log(watchablePackages.map(p => `- ${p}`).join('\n'));
  console.log('\n');

  const paths = [
    ...watchablePackages.map(p => `${p}/src/**/*.ts`),
    ...watchablePackages.map(p => `${p}/src/**/*.tsx`),
  ];

  const watcher = chokidar.watch(paths, { ignored: /tests/ });
  const started = [];
  watcher.on('change', filePath => {
    const [, pkg] = filePath.split(path.sep);
    if (started.includes(pkg)) {
      watcher.unwatch(filePath);
      return;
    }

    started.push(pkg);
    console.log(`Starting tsc watcher for \`@react-md/${pkg}\`...`);

    const args = ['tsc', '-w', '-p', `packages/${pkg}/tsconfig.ejs.json`];
    const args2 = args.slice();
    args2[3] = args2[3].replace('.ejs', '.cjs');
    processes.push(spawn('npx', args, { stdio: 'inherit' }));
    processes.push(spawn('npx', args2, { stdio: 'inherit' }));
  });
})();

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

function compileBaseStyles() {
  spawnSync('yarn', ['base-styles'], { stdio: 'inherit', cwd: docsRoot });
}

const copyScssFile = f => {
  copyFile(f, 'dist', startLoggingScss);
  compileBaseStyles();
};

const copyDefinitionFile = f => copyFile(f, 'types', startLoggingDefs);

chokidar
  .watch('packages/*/src/**/*.scss', { ignored: IGNORED })
  .on('change', filePath => {
    copyScssFile(filePath);
  })
  .on('ready', () => {
    console.log('Watching for scss file changes...');
    startLoggingScss = true;
  });

chokidar
  .watch('packages/*/src/**/*.d.ts', { ignored: IGNORED })
  .on('add', copyDefinitionFile)
  .on('change', copyDefinitionFile)
  .on('ready', () => {
    console.log('Watching for typescript definition changes...');
    startLoggingDefs = true;
  });

chokidar
  .watch(['packages/*/README.md'], { ignored: IGNORED })
  .on('change', () => {
    spawnSync('yarn', ['copy-readmes'], { stdio: 'inherit', cwd: docsRoot });
    console.log('Done!');
  })
  .on('ready', () => {
    console.log('Watching package readme changes...');
  });

const DOC_COMPONENTS = 'packages/documentation/components';
chokidar
  .watch([
    'packages/documentation/_variables.scss',
    'packages/documentation/pages/app.scss',
    `${DOC_COMPONENTS}/blockquote.scss`,
    `${DOC_COMPONENTS}/Code/code.scss`,
    `${DOC_COMPONENTS}/Heading/heading.scss`,
  ])
  .on('change', () => compileBaseStyles())
  .on('ready', () => {
    console.log('Watching documentation base styles changes...');
  });

const IS_FULL_SANDBOX = process.argv.includes('--sandbox');

chokidar
  .watch(`${DOC_COMPONENTS}/Demos/*/index.tsx`)
  .on('change', file => {
    const [packageName, demo] = file
      .substring(file.indexOf('Demos/') + 'Demos/'.length)
      .split('/');

    if (!fs.existsSync(file.replace(/\.tsx?$/, 'Sandbox.json'))) {
      const demoName = demo.replace(/\.tsx?$/, '');
      console.log(`Creating a new sandbox for ${packageName}'s ${demoName}`);

      const args = [
        'sandbox',
        packageName,
        !IS_FULL_SANDBOX && '--empty',
      ].filter(Boolean);
      spawnSync('yarn', args, { stdio: 'inherit', cwd: docsRoot });
    }
  })
  .on('ready', () => {
    console.log(
      `Watching documentation demos with ${
        IS_FULL_SANDBOX ? 'full' : 'empty'
      } sandboxes when the demo index.tsx file is changed...`
    );
  });

process.on('exit', () => {
  processes.forEach(proc => {
    proc.kill('SIGINT');
  });
});
