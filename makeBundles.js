const fs = require('fs');
const path = require('path');

// Creates 255 bundles.. Need to get better at some colors and choose like 20
const colors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'deep-orange',
];

const noAccents = ['brown', 'grey', 'blue-grey'];

const bundles = path.resolve(process.cwd(), 'src', 'scss', 'bundles');

try {
  fs.statSync(bundles).isDirectory();
} catch (e) {
  fs.mkdirSync(bundles);
} finally {
  noAccents.concat(colors).forEach(color => {
    colors.forEach(accent => {
      if (color !== accent) {
        fs.writeFile(path.join(bundles, `${color.replace('-', '_')}-${accent.replace('-', '_')}.scss`), `
@import '../react-md';

$md-primary-color: $md-${color}-500;
$md-secondary-color: $md-${accent}-a-400;

@include react-md-everything;
`,
          err => {
            if (err) {
              throw err;
            }
          }
        );
      }
    });
  });
}
