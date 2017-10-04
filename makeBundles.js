/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const Promise = require('bluebird');

const render = Promise.promisify(sass.render);
const writeFile = Promise.promisify(fs.writeFile);

// Creates 255 bundles.. Need to get better at some colors and choose like 20
const colors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'deep-orange',
];
const noAccents = ['brown', 'grey', 'blue-grey'];

const dist = path.resolve(process.cwd(), 'dist');
const scss = path.resolve(process.cwd(), 'src', 'scss');

try {
  fs.accessSync(dist, fs.constants.F_OK);
} catch (e) {
  fs.mkdirSync(dist);
}

console.log('Starting to compile the 255 css bundles...');
Promise.all(colors.concat(noAccents).reduce((promises, color) => {
  colors.forEach((accent) => {
    if (color !== accent) {
      const fileName = path.join(dist, `react-md.${color.replace('-', '_')}-${accent.replace('-', '_')}.min.css`);
      promises.push(render({
        data: `
@import 'react-md';

$md-primary-color: $md-${color}-500;
$md-secondary-color: $md-${accent}-a-400;

@include react-md-everything;
        `,
        outputStyle: 'compressed',
        outFile: fileName,
        sourceMap: false,
        includePaths: [scss],
      }).then((result) => writeFile(fileName, result.css, 'UTF-8')));
    }
  });

  return promises;
}, [])).then(() => {
  console.log('Compilation complete!');
});
