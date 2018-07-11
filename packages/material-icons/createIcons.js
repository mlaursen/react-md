#!/usr/bin/env node

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const AdmZip = require('adm-zip');
const download = require('download');
const commander = require('commander');
const Bluebird = require('bluebird');
const execSync = require('child_process').execSync;

const readFile = Bluebird.promisify(fs.readFile);

commander
  .usage('<version> [options]')
  .option('-d, --download-only [downloadOnly]', 'This will only download and unzip the material-design-icons into the temp directory')
  .option('-i, --icons-only [iconsOnly]', 'This will only find and replace all icons within the temp directory for material-design-icons into the svg directory.')
  .option('-u, --update-only [componentsOnly]', 'This will just update the generated component files only instead of downloading and finding icons from the source.')
  .option('-c, --clean [clean]', 'This will remove all the temp files created by this script')
  .option('--no-cleanup', 'This will prevent the script from automatically removing all the temp files if no other options are provided')
  .parse(process.argv);

let [version] = commander.args;
if (!version) {
  // the current latest version
  version = '3.0.1';
}

const fileName = `material-design-icons-${version}.zip`;
const downloadUrl = `https://github.com/google/material-design-icons/releases/download/${version}/${fileName}`;
const src = path.join(process.cwd(), 'src');
const temp = path.join(process.cwd(), 'temp');
const svgs = path.join(process.cwd(), 'svgs');
const mainIndex = path.join(src, 'index.ts');

async function downloadSource() {
  await fs.remove(temp);
  await fs.ensureDir(temp),
  console.log(`Downloading: '${downloadUrl}'`);
  await download(downloadUrl, temp)

  console.log(`Unzipping to '${path.join(temp, fileName.replace(/\.zip$/, ''))}'...`);
  const zip = new AdmZip(path.join(temp, fileName));
  zip.extractAllTo(temp);
  console.log('Done unzipping!');
}

function findAndCopyIcons() {
  return new Promise(async (resolve, reject) => {
    console.log('Removing old svgs folder...');
    await fs.remove(svgs);
    await fs.ensureDir(svgs);

    console.log(`Finding all icons and copying into '${svgs}'...`);
    glob('**/production/*_24px.svg', { root: temp }, async (err, matches) => {
      if (err) {
        reject(err);
        return;
      }

      const fileNames = [];
      await Promise.all(matches.reduce((promises, svgPath) => {
        const fileName = svgPath.substring(svgPath.lastIndexOf('/') + 1)
          .substring('ic_'.length)
          .replace(/_24px/, '');

        if (fileNames.indexOf(fileName) === -1) {
          fileNames.push(fileName);
          promises.push(fs.copy(svgPath, path.join(svgs, fileName)));
        }

        return promises;
      }, []));

      console.log(`Copied ${fileName.length} unique icons into '${svgs}'!`);
      resolve();
    });
  });
}

function toPascalCase(fileName) {
  if (fileName.match(/^[0-9]/)) {
    const [first, second, ...remaining] = fileName.split('_');
    fileName = `${second}_${first}${remaining.length ? `_${remaining.join('_')}` : ''}`;
  }

  return _.upperFirst(_.camelCase(fileName));
}

function createIconFile(componentName, children, iconType) {
  return `/* tslint:disable:max-line-length */
// This is a generated file from running the "createIcons" script. This file should not be updated manually.
import * as React from "react";

import { ${iconType}Icon, I${iconType}IconProps } from "@react-md/icon";

const ${componentName}${iconType}Icon: React.SFC<I${iconType}IconProps> = props => <${iconType}Icon {...props}>${children}</${iconType}Icon>;

export default ${componentName}${iconType}Icon;

`;
}

// kind of hacky, but each icon starts and ends the same way right now..
const SVG_ICON_PREFIX = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">';
const SVG_ICON_SUFFIX = '</svg>';

async function parseSVGFileAndCreateComponents(svgFilePath, componentName, iconName, svgIconFile, fontIconFile) {
  const svg = await readFile(path.join(process.cwd(), svgFilePath), 'utf8');
	const contents = svg.substring(SVG_ICON_PREFIX.length, svg.length - SVG_ICON_SUFFIX.length);;

  await Promise.all([
    fs.outputFile(svgIconFile, createIconFile(componentName, contents, 'SVG')),
    fs.outputFile(fontIconFile, createIconFile(componentName, iconName, 'Font')),
  ]);
}

async function createIndexFile(components) {
  const contents = `// This is a generated file from running the "createIcons" script. This file should not be updated manually.
${components.reduce((s, c) => `${s ? `${s}\n` : ''}export { default as ${c} } from "./${c}";`, '')}
`;

  return fs.outputFile(mainIndex, contents);
}

async function createComponentFiles() {
  return new Promise((resolve, reject) => {
    console.log(`Finding all svgs within the '${svgs}' folder...`);
    glob('svgs/*.svg', async (err, svgFiles) => {
      if (err) {
        reject(err);
        return;
      }

      await fs.remove(src);
      await fs.ensureDir(src);

      console.log('Creating all the SVGIcon and FontIcon components...');
      const components = [];
      await Promise.all(svgFiles.map((svgFilePath) => {
        const iconName = svgFilePath.replace(/.+\//, '').replace(/\.svg$/, '');
        const componentName = toPascalCase(iconName);
        const svgIconName = `${componentName}SVGIcon`;
        const fontIconName = `${componentName}FontIcon`;
        const svgIconFile = path.join(src, `${svgIconName}.tsx`);
        const fontIconFile = path.join(src, `${fontIconName}.tsx`);
        components.push(svgIconName, fontIconName);

        return parseSVGFileAndCreateComponents(svgFilePath, componentName, iconName, svgIconFile, fontIconFile);
      }));
      console.log('Updating the main index file to include all the components...');
      await createIndexFile(components);

      console.log('Running prettier on generated files...');
      execSync('npm run prettier');
      console.log('Done!');
    });
  });
}

async function cleanFiles() {
  console.log(`Removing the '${temp}' folder...`);
  await fs.remove(temp);
  console.log('Done!');
}

(async function run() {
  const { componentsOnly, downloadOnly, iconsOnly, clean, cleanup } = commander;
  if (clean) {
    await cleanFiles();
  } else if (downloadOnly) {
    await downloadSource();
  } else if (iconsOnly) {
    await findAndCopyIcons();
  } else if (componentsOnly) {
    await createComponentFiles();
  } else {
    await downloadSource();
    await findAndCopyIcons();
    await createComponentFiles();

    if (cleanup) {
      await cleanFiles();
    }
  }
})();
