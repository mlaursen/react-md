const path = require('path');
const nodeSass = require('node-sass');
const Promise = require('bluebird');

const sass = Promise.promisify(nodeSass.render);

const accentColors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue',
  'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime',
  'yellow', 'amber', 'orange', 'deep-orange',
];
const noAccentColors = ['brown', 'grey', 'blue-grey'];
const colors = accentColors.concat(noAccentColors);
const hues = [100, 200, 400, 700];

function validatePrimary(color) {
  return color && colors.indexOf(color) !== -1;
}

function validateSecondary(color, hue) {
  return color && hue && accentColors.indexOf(color) !== -1 && hues.indexOf(hue) !== -1;
}

module.exports = function theme(req, res) {
  const fileName = req.url.replace(/\/themes\/|\.css/g, '');
  const [primary, secondaryColor, dark] = fileName.split('.');
  const split = secondaryColor.split('-');
  const secondary = split.slice(0, split.length - 1).join('-');
  const hue = split[split.length - 1];

  if (!validatePrimary(primary) || !validateSecondary(secondary, parseInt(hue, 10))) {
    res.sendStatus(400);
    return;
  }

  const primaryVal = `$md-${primary}-500`;
  const secondaryVal = `$md-${secondary}-${hue}`;

  let darkThemeUpdate = '';
  if (dark) {
    darkThemeUpdate = `
.example-code,
.code-block {
  background: $md-grey-300;
}

a:not(.md-btn) {
  color: $md-purple-a-400;

  &:visited {
    color: $md-purple-a-100;
  }
}
`;
  }

  const additionalStyles = `
.custom-theme {
  .banner {
    background: ${primaryVal};
  }

  .react-md-logo {
    text,
    path#Oval-210 {
      fill: ${secondaryVal};
    }
  }

  ${darkThemeUpdate}
}
  `;

  sass({
    data: `@import 'react-md';@include react-md-theme-everything(${primaryVal}, ${secondaryVal}, ${!dark}, 'custom-theme');${additionalStyles}`,
    includePaths: [path.resolve(process.cwd(), '..', 'src', 'scss')],
    outputStyle: 'compressed',
  }).then((stats, error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }

    const { css } = stats;
    res.header('Content-Type', 'text/css');
    res.send(css.toString());
  });
};
