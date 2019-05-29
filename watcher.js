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
  const watchablePackages = TYPESCRIPT_PACKAGES.map(n =>
    path.join('packages', n)
  );
  console.log(
    'Starting tsc in build watcher mode for the following packages...'
  );
  console.log(watchablePackages.map(p => `- ${p}`).join('\n'));
  const args = [
    'tsc',
    '-b',
    '-w',
    ...watchablePackages,
    ...watchablePackages.map(pkg => `${pkg}/tsconfig.cjs.json`),
  ];
  processes.push(spawn('npx', args, { stdio: 'inherit' }));
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
