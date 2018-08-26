const path = require('path');

module.exports = function createScssFiles(name, src, styles) {
  if (!styles) {
    return;
  }

  const SCSS_FILE_TEMPLATE = `////
/// @group ${name}
////

`;

  const SCSS_PACKAGE_FILE_TEMPLATE = `${SCSS_FILE_TEMPLATE}
@import 'functions';
@import 'mixins';
@import 'variables';
`;
  const STYLES_FILE_TEMPLATE = `@import '${name}';

@include react-md-${name};
`;

  return {
    [path.join(src, '_functions.scss')]: SCSS_FILE_TEMPLATE,
    [path.join(src, '_variables.scss')]: SCSS_FILE_TEMPLATE,
    [path.join(src, '_mixins.scss')]: SCSS_FILE_TEMPLATE,
    [path.join(src, `_${name}.scss`)]: SCSS_PACKAGE_FILE_TEMPLATE,
    [path.join(src, 'styles.scss')]: STYLES_FILE_TEMPLATE,
  };
};
