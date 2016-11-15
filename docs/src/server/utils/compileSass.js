const path = require('path');
const Promise = require('bluebird');
const nodeSass = require('node-sass');

const sass = Promise.promisify(nodeSass.render);

const { ACCENTABLE_COLORS, PRIMARY_COLORS, SECONDARY_HUES } = require('../../shared/constants/colors');

const DARK_THEME_STYLES = `
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

function toColorName(color) {
  return color && color.replace('_', '-');
}

function validatePrimary(color) {
  return color && PRIMARY_COLORS.indexOf(color) !== -1;
}

function validateSecondary(color, hue) {
  return color && hue && ACCENTABLE_COLORS.indexOf(color) !== -1 && SECONDARY_HUES.indexOf(hue) !== -1;
}

/**
 * Attempts to compiles sass based off of a css file name. The filename should be formatted
 * as 'PRIMARY_COLOR-SECONDARY_COLOR-HUE-dark?.css' where `dark` is optional.
 *
 * @param {String} name - The CSS filename to convert into styles.
 * @return {Promise} a promise with the buffer of compiles styles
 */
module.exports = function compileSass(name) {
  const [p, s, hue, dark] = name.split('-');
  const primary = toColorName(p);
  const secondary = toColorName(s);

  if (!validatePrimary(primary)) {
    return Promise.reject(new Error(`Invalid primary color: ${primary}`));
  } else if (!validateSecondary(secondary, parseInt(hue, 10))) {
    return Promise.reject(new Error(`Invalid secondary color: ${secondary}-${hue}`));
  }

  const primaryColor = `$md-${primary}-500`;
  const secondaryColor = `$md-${secondary}-a-${hue}`;
  const darkThemeStyles = dark ? DARK_THEME_STYLES : '';

  const styles = `
@import 'react-md';

$md-primary-color: $md-light-blue-500;
$md-secondary-color: $md-deep-orange-a-200;
@include react-md-theme-everything(${primaryColor}, ${secondaryColor}, ${!dark}, 'custom-theme');

.custom-theme {
  .banner {
    background: ${primaryColor};
  }

  .react-md-logo {
    text,
    #Group > path:first-child,
    path#Oval-210 {
      fill: ${secondaryColor};
    }
  }

  ${darkThemeStyles}
}

@media #{$md-tablet-media} {
  .custom-theme .phone-size-container .md-toolbar:not(.md-toolbar--inset)::before {
    background: ${primaryColor};
  }
}
  `;

  return sass({
    data: styles,
    includePaths: [path.resolve(process.cwd(), '..', 'src', 'scss')],
    outputStyle: 'compressed',
  }).then((stats, error) => {
    if (error) {
      return Promise.reject(error);
    }

    return stats.css;
  });
};
