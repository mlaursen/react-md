#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const commander = require('commander');
const readline = require('readline');

const VERSION = '2.0.0-alpha-1';

commander
  .version(VERSION)
  .usage('<name> [options]')
  .option('--no-styles', 'Updates the generated README to not include a section on how to include styles for this package.')
  .option('--no-ts', 'This will exclude the typescript build scripts from the package.json if enabled.')
  .option('--no-proptypes', 'Updates the generated README to not include a section for documenting component prop types.')
  .option('-d, --description [description]', 'Updates both the README and the package.json to include the description string.')
  .option('-p, --private [private]', 'This will make the package private so it will never be published to npm.')
  .parse(process.argv);


let [name] = commander.args;
const description = typeof commander.description === 'string' ? commander.description : '';
const { styles, ts: typescript, proptypes, private } = commander;
if (!name) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => rl.question('Enter a package name: ', (packageName) => {
    if (!packageName) {
      prompt();
      return;
    }
    name = packageName;

    rl.close();
  });

  prompt();
}

const LICENSE = `The MIT License (MIT)

Copyright (c) 2015-2018 Mikkel Laursen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const TSCONFIG_TEMPLATE = {
  compilerOptions: {
    jsx: 'react',
    strict: true,
    noImplicitAny: true,
    noImplicitThis: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictPropertyInitialization: true,
    alwaysStrict: true,
    esModuleInterop: true,
    declaration: false,
    typeRoots: [
      'node_modules/@types/',
    ],
  },
  exclude: [
    '**/__tests__/*',
  ],
};

const TSCONFIG_COMMONJS_TEMPLATE = {
  extends: './tsconfig.json',
  compilerOptions: {
    outDir: './lib',
    target: 'es5',
    module: 'commonjs',
    sourceMap: true,
  },
};

const TSCONFIG_MODULE_TEMPLATE = {
  extends: './tsconfig.json',
  compilerOptions: {
    outDir: './es',
    target: 'es6',
    module: 'es6',
    sourceMap: true,
  },
};

const README_STYLES_TEMPLATE = `
#### Updating Sass to include \`node_modules\`
If you want to include the SCSS styles for \`@react-md/${name}\`, you will need to update your Sass compiler to include the \`node_modules\` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

#### webpack
\`\`\`diff
 {
   test: /\.scss$/,
   use: [{
     loader: 'style-loader',
     options: { sourceMap: true },
   }, {
     loader: 'css-loader',
     options: { sourceMap: true, importLoaders: 2 },
   }, {
     loader: 'postcss',
     options: { sourceMap: true },
   }, {
     loader: 'sass-loader',
     options: {
       sourceMap: true,
+      includePaths: [
+        './node_modules', // or whatever relative path it is to node_modules
+      ],
     },
   }],
 }
\`\`\`

#### create-react-app and node-sass-chokidar
\`\`\`diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
\`\`\`

### Styles
Including all the base styles can be done by either importing the styles file from the \`dist\` folder or importing the helpers file and using the mixin \`react-md-${name}\`:

\`\`\`scss
// This import will generate styles by default.
@import '@react-md/${name}/dist/styles';
\`\`\`

or

\`\`\`scss
// This import only includes all the utility variables, mixins, and functions.
@import '@react-md/${name}/dist/${name}';

// Once everything has been imported, you can generate the styles with the following mixin
@include react-md-${name};
\`\`\`

If you would like to just import all the utility variables, mixins, and functions:
\`\`\`scss
@import '@react-md/${name}/dist/${name}';

// Any custom styles that use the utilities
\`\`\`
`;

const README_PROPTYPES_TEMPLATE = `
<!-- PROPS_START -->
<!-- PROPS_END -->
`;

const README_TEMPLATE = `
# @react-md/${name}
${description}

This source code of this package can be found at: https://github.com/mlaursen/react-md/tree/next/packages/${name}

<!-- TOC_START -->
<!-- TOC_END -->

## Installation
\`\`\`sh
$ npm install --save @react-md/${name}
\`\`\`

## Usage
${styles ? README_STYLES_TEMPLATE : ''}

${proptypes ? README_PROPTYPES_TEMPLATE : ''}
`;

const JEST_CONFIG_TEMPLATE = `
module.exports = {
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};

`;

/**
 * This is the base file template to use when generating scss files.
 */
const SCSS_FILE_TEMPLATE = `////
/// @group ${name}
////


`;

/**
 * This is the file contents for the src/_${name}.scss
 */
const SCSS_PACKAGE_FILE_TEMPLATE = `${SCSS_FILE_TEMPLATE}

@import 'functions';
@import 'mixins';
@import 'variables';

`;

/**
 * This is the file template that should be used for src/styles.scss. This is the one
 * that will generate all the styles if included.
 */
const STYLES_FILE_TEMPLATE = `@import '${name}';

@include react-md-${name};

`;


let main;
let esModule;
let types;
const files = [];
const scripts = {};
if (styles || typescript) {
  let build = 'npm-run-all -p';
  let clean = 'rimraf';
  if (typescript) {
    build = `${build} \"build:commonjs\" \"build:modules\" \"build:definitions\"`;
    clean = `${clean} es lib types`;

    scripts['build:commonjs'] = 'tsc -p tsconfig.commonjs.json';
    scripts['build:modules'] = 'tsc -p tsconfig.modules.json';
    scripts['build:definitions'] = 'tsc -p tsconfig.modules.json -d --declarationDir ./types';


    main = './lib/index.js';
    esModule = './es/index.js';
    types = './types/index.d.ts';
    files.push('es/*', 'lib/*', 'types/*');
  }

  if (styles) {
    build = `${build} \"styles\"`;
    clean = `${clean} dist`;
    files.push('dist/*');
  }

  scripts.build = build;
  scripts.clean = clean;
  scripts.prebuild = 'npm run clean';

  if (styles) {
    scripts.styles = 'copyfiles -u 1 \"src/**/*.scss\" dist';
  }

  if (typescript) {
    scripts.test = 'jest src';
    scripts.watch = 'npm-run-all -p \:build:commonjs -- --watch\" \"build:modules -- --watch -d --declarationDir ./types\"'
  }
}

let docsScript = 'doc-generator';
if (!proptypes) {
  docsScript = `${docsScript} --no-proptypes`;
}

if (!styles) {
  docsScript = `${docsScript} --no-sassdoc`;
}

scripts.docs = docsScript;
scripts.prepublishOnly = `npm run build && npm run docs`;

let dependencies;
const devDependencies = {
  'doc-generator': `^${VERSION}`,
  'npm-run-all': '^4.1.3',
  'rimraf': '^2.6.2',
};

if (typescript) {
  dependencies = {
    "classnames": "^2.2.6",
  };
  devDependencies['@types/classnames'] = '^2.2.4';
  devDependencies['@types/jest'] = '^23.1.0';
  devDependencies['@types/prop-types'] = '15.5.3';
  devDependencies['@types/react'] = '^16.3.18';
  devDependencies['@types/react-dom'] = '^16.0.6';
  devDependencies['enzyme'] = '^3.3.0';
  devDependencies['enzyme-adapter-react-16'] = '^1.1.1';
  devDependencies['enzyme-to-json'] = '^3.3.4';
  devDependencies['jest'] = '^23.1.0';
  devDependencies['react'] = '^16.4.1';
  devDependencies['react-dom'] = '^16.4.1';
  devDependencies['react-test-renderer'] = '^16.4.1';
  devDependencies['ts-jest'] = '^22.4.6';
  devDependencies['ts-lint'] = '^4.5.1';
  devDependencies['typescript'] = '^2.9.2';
}

if (styles) {
  devDependencies.copyfiles = '^2.0.0';
}

const package = {
  name: `@react-md/${name}`,
  version: VERSION,
  private: private || undefined,
  description: `${description}`,
  scripts,
  main,
  module: esModule,
  types,
  files,
  author: 'Mikkel Laursen <mlaursen03@gmail.com>',
  repository: 'https://github.com/mlaursen/react-md',
  license: 'MIT',
  dependencies,
  devDependencies: Object.keys(devDependencies).sort().reduce((deps, key) => {
    deps[key] = devDependencies[key];
    return deps;
  }, {}),
};

const dir = path.resolve(process.cwd(), 'packages', name);
const src = path.join(dir, 'src');

const filesToCreate = {
  [path.join(dir, 'package.json')]: package,
  [path.join(dir, 'LICENSE')]: LICENSE,
  [path.join(dir, 'README.md')]: README_TEMPLATE,
};

if (typescript) {
  filesToCreate[path.join(src, 'index.ts')] = '';
  filesToCreate[path.join(dir, 'jest.config.js')] = JEST_CONFIG_TEMPLATE;
  filesToCreate[path.join(dir, 'tsconfig.json')] = TSCONFIG_TEMPLATE;
  filesToCreate[path.join(dir, 'tsconfig.commonjs.json')] = TSCONFIG_COMMONJS_TEMPLATE;
  filesToCreate[path.join(dir, 'tsconfig.modules.json')] = TSCONFIG_MODULE_TEMPLATE;
}

if (styles) {
  filesToCreate[path.join(src, '_functions.scss')] = SCSS_FILE_TEMPLATE;
  filesToCreate[path.join(src, '_variables.scss')] = SCSS_FILE_TEMPLATE;
  filesToCreate[path.join(src, '_mixins.scss')] = SCSS_FILE_TEMPLATE;
  filesToCreate[path.join(src, `_${name}.scss`)] = SCSS_PACKAGE_FILE_TEMPLATE;
  filesToCreate[path.join(src, 'styles.scss')] = STYLES_FILE_TEMPLATE;
}

fs.mkdirSync(dir);
fs.mkdirSync(src);

function createFile(path, contents) {
  return new Promise((resolve, reject) => {
    if (typeof contents !== 'string') {
      contents = JSON.stringify(contents, null, 2);
    }

    fs.writeFile(path, contents, 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    })
  });
}

console.log('Creating basic folder structure and files...')
Promise.all(Object.keys(filesToCreate).map(key => createFile(key, filesToCreate[key])))
  .then(() => {
    console.log('Installing base dependencies...');
    execSync('lerna bootstrap');
    console.log(`Done! You can now \`cd\` into "packages/${name}" and start coding.`);
  })
