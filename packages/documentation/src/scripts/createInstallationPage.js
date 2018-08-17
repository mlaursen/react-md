const fs = require('fs-extra');
const path = require('path');
const commander = require('commander');
const toc = require('markdown-toc');

const PACKAGES_THAT_REQUIRE_STYLES = [
  '@react-md/app-bar',
  '@react-md/button',
  '@react-md/icon',
  '@react-md/link',
  '@react-md/list',
  '@react-md/overlay',
  '@react-md/sheet',
  '@react-md/theme',
  '@react-md/tooltip',
  '@react-md/transition',
  '@react-md/tree-view',
  '@react-md/typography',
];

const packages = [];
commander
  .option("-a, --all [all]")
  .arguments('[packages...]')
  .action((specificPackages) => {
    [].push.apply(packages, specificPackages);
  })
  .parse(process.argv);

const { all } = commander;

if (!all && !packages.length) {
  throw new Error('At least one package is required to create an installation page for.');
  process.exit(1);
}

const packagesDir = path.join(process.cwd(), '..');

function getPackage(packageName) {
  const pkg = path.join(packagesDir, packageName, 'package.json');
  if (!fs.pathExistsSync(pkg)) {
    throw new Error(`Unable to find a package.json file at path: \`${pkg}\``);
  }

  return fs.readJson(pkg);
}

const readdir = path => new Promise((resolve, reject) => {
  fs.readdir(path, (error, files) => {
    if (error) {
      reject(error);
    } else {
      resolve(files);
    }
  });
})

async function getExportedScssFiles(packageName) {
  const src = path.join(packagesDir, packageName, 'src');
  const files = await readdir(src);

  return files.filter(file => file.endsWith('.scss'));
}

Promise.all(packages.map(async (name) => {
  const pkg = await getPackage(name);
  if (pkg.private) {
    throw new Error(`The package: \`${name}\` is set to private so an installation page cannot be created.`);
  }

  const dependencies = (pkg.dependencies && Object.keys(pkg.dependencies).filter(name => PACKAGES_THAT_REQUIRE_STYLES.includes(name))) || [];
  const installPackages = `@react-md/${name}${dependencies.reduce((s, dep) => `${s} \\\\\n    ${dep}`, '')}`;
  let markdown = `## Installing
\`\`\`sh
$ npm install --save ${installPackages}
\`\`\`

or with \`yarn\`

\`\`\`sh
$ yarn add ${installPackages}
\`\`\`${dependencies.length ? `\n\n> NOTE: The packages listed after the first line are required for additional styles. They only need to be added once to your project.\n` : ''}
`;

  if (pkg.scripts.styles || dependencies.length) {
    markdown = `${markdown}

## Including Styles
The following sections will be helpers to update your Sass compiler to include the \`node_modules\` in the \`include-paths\` either for an
app using \`create-react-app\` or a custom webpack config as well as adding \`autoprefixer\`. If you have already completed these steps,
you can skip down to [Installing Styles Quick](#including-styles-quick).

### Updating Sass to include \`node_modules\`
If you want to include the SCSS styles for \`@react-md/${name}\`, you will need to update your Sass compiler to include the \`node_modules\` in the paths as well as add [autoprefixer](https://github.com/postcss/autoprefixer) to handle multiple browser compatibility.

> If you are using [create-react-app](https://github.com/facebook/create-react-app), the autoprefixer is already included.

### webpack
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

### create-react-app and node-sass-chokidar
\`\`\`diff
   "scripts": {
+    "build-css": "node-sass-chokidar --include-path ./node_modules src/ -o src/",
+    "watch-css": "npm run build-csss && npm run build-css -- --watch --recursive"
   }
\`\`\`
`;
    const files = await getExportedScssFiles(name);

    markdown = `${markdown}

### Scss File Names and Importing
This package exports the following files:
${files.map(file => `- ${file}`).join('\n')}

which are mostly self describing about what they export.
`;
    if (files.includes('styles.scss')) {
      markdown = `${markdown} The \`styles.scss\` is the only file that will generate styles by default
when imported into your project as well as including all variables, functions, and mixins for this package.`
    } else {
      markdown = `${markdown} You can safely include any of these files without any styles being generated since
they only include variable, function, or mixin declarations and are never called.`
    }
    if (files.includes(`_${name}.scss`)) {
      markdown = `${markdown} The \`${name}.scss\` is a file that is used to just automatically import all files within
this package for convenience. So for example:
\`\`\`scss
@import '@react-md/${name}/dist/variables';
@import '@react-md/${name}/dist/mixins';
\`\`\`

would be the same as
\`\`\`scss
@import '@react-md/${name}/dist/${name}';
\`\`\`
`
    }
  }

  if (dependencies.length) {
    markdown = `${markdown}

This package also requires the styles from the following packages:
${dependencies.map(dep => `- \`${dep}\``).join('\n')}

so you will need to follow the above steps to include the styles for them as well.

## Including Styles Quick
\`\`\`scss
@import '@react-md/${name}/dist/${name}';
${dependencies.map(dep => `@import '${dep}/dist/${dep.replace('@react-md/', '')}';`).join('\n')}

@include react-md-${name};
${dependencies.map(dep => `@include react-md-${dep.replace('@react-md/', '')};`).join('\n')}
\`\`\`
`;
  }

  markdown = `# Installing @react-md/${name}

## Table of Contents
${toc(markdown).content}

${markdown}`;


  const contents = `/* tslint:disable max-line-length */
import * as React from "react";

import { MarkdownPage } from "components/Markdown";

const markdown = \`${markdown.replace(/`/g, '\\`')}\`;

const Installation = () => <MarkdownPage markdown={markdown} />;

export default Installation;
`;
  const folderName = name.split('-').map(part => part.substring(0, 1).toUpperCase() + part.substring(1)).join('');
  const packagePath = path.join(packagesDir, 'documentation', 'src', 'components', folderName);
  await fs.ensureDir(packagePath);
  return fs.writeFile(path.join(packagePath, 'Installation.tsx'), contents);
})).then(() => {
  console.log('Done');
});
