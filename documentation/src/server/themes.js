import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import nodeSass from 'node-sass';
import {
  ACCENTABLE_COLORS,
  PRIMARY_COLORS,
  SECONDARY_HUES,
} from 'constants/colors';
import { hyphenate } from 'utils/strings';

const sass = Promise.promisify(nodeSass.render);
const writeFile = Promise.promisify(fs.writeFile);
const access = Promise.promisify(fs.access);
const mkdir = Promise.promisify(fs.mkdir);

const THEMES_FOLDER = path.resolve(process.cwd(), 'public', 'themes');

const DARK_THEME_STYLES = `
ul:not(.md-list) {
  color: get-color('text', false);
}

a:not(.md-btn) {
  color: $md-purple-a-400;

  &:visited {
    color: $md-purple-a-100;
  }
}
`;

function isValidPrimary(color) {
  return color && PRIMARY_COLORS.indexOf(color) !== -1;
}

function isValidSecondary(color, hue) {
  return color
    && hue
    && ACCENTABLE_COLORS.indexOf(color) !== -1
    && SECONDARY_HUES.indexOf(hue) !== -1;
}

async function compileSass(fileName) {
  const [primaryColor, secondaryColor, hueString, darkTheme] = fileName.split('-');
  const primary = hyphenate(primaryColor);
  const secondary = hyphenate(secondaryColor);
  const hue = parseInt(hueString, 10);

  if (!isValidPrimary(primary)) {
    throw new Error(`Invalid primary color: ${primary}`);
  } else if (!isValidSecondary(secondary, hue)) {
    throw new Error(`Invalid secondary color: ${secondary}-${hue}`);
  }

  const primaryVar = `$md-${primary}-500`;
  const secondaryVar = `$md-${secondary}-a-${hue}`;
  const darkStyles = darkTheme ? DARK_THEME_STYLES : '';
  const styles = `
@import 'react-md';

$md-primary-color: $md-light-blue-500;
$md-secondary-color: $md-deep-orange-a-200;
@include react-md-theme-everything(${primaryVar}, ${secondaryVar}, ${!darkTheme}, 'custom-theme');

.custom-theme {
  .home {
    &__banner {
      background: ${primaryVar};
    }

    &__logo {
      text,
      #Group > path:first-child,
      path#Oval-210 {
        fill: ${secondaryVar};
      }
    }
  }

  .not-found {
    background: $md-${primary}-800;

    &__svg-oval {
      fill: ${secondaryVar};
    }

    &__svg--circle-1 {
      fill: $md-${primary}-700;
    }

    &__svg--circle-2 {
      fill: $md-${primary}-600;
    }

    &__svg--circle-3 {
      fill: ${primaryVar};
    }
  }

  ${darkStyles}
}

@media #{$md-tablet-media} {
  .custom-theme .phone-size-container .md-toolbar:not(.md-toolbar--inset)::before {
    background: ${primaryVar};
  }
}
  `;

  const stats = await sass({
    data: styles,
    includePaths: [path.resolve(process.cwd(), '..', 'src', 'scss')],
    outputStyle: __DEV__ ? 'expanded' : 'compressed',
  });

  return stats.css;
}

async function createStylesheet(fileName, css) {
  try {
    await access(THEMES_FOLDER, fs.constants.F_OK)
      .catch(() => mkdir(THEMES_FOLDER));
  } catch (e) { // eslint-disable-line no-empty
  }

  return await writeFile(path.join(THEMES_FOLDER, `${fileName}.css`), css, 'UTF-8');
}

export default async function themes(req, res) {
  const fileName = req.url.replace(/\/themes\/|\.css/g, '');
  try {
    const css = await compileSass(fileName);
    if (!__DEV__) {
      await createStylesheet(fileName, css);
    }

    res.header('Content-Type', 'text/css');
    res.send(css.toString());
  } catch (e) {
    res.sendStatus(e.status || 500);
  }
}
