function createScripts(styles, typescript, types, sassdoc, propTypes) {
  const scripts = {};
  let watch = '';
  if (typescript) {
    if (types) {
      scripts.types = 'cpx "src/types.d.ts" types';
    }

    scripts['build:commonjs'] = 'tsc -p tsconfig.commonjs.json';
    scripts['build:modules'] = 'tsc -p tsconfig.json';
    watch = 'npm-run-all -p "build:commonjs -- --watch" "build:modules -- --watch"';
  }

  scripts.build = `${types ? 'npm run types && ' : ''}npm-run-all -p build:commonjs build:modules${styles ? ' styles' : ''}`;
  scripts.clean = 'rimraf es lib types dist';
  scripts.prebuild = 'npm run clean';
  if (styles) {
    const watchStyles = 'npm run styles -- --watch';
    scripts.styles = 'cpx "src/**/*.scss" dist';
    if (watch) {
      scripts['watch:styles'] = watchStyles;
      watch = `${watch} watch:styles`;
    } else {
      watch = watchStyles;
    }
  }

  scripts.watch = watch;
  if (typescript) {
    scripts.test = 'jest src';
  }

  let docs = 'doc-generator';
  if (!propTypes) {
    docs = `${docs} --no-proptypes`;
  }

  if (!sassdoc) {
    docs = `${docs} --no-styles`;
  }

  scripts.docs = docs;
  if (styles && typescript) {
    scripts.lint = 'npm-run-all -p lint:styles lint:ts';
    scripts['lint:styles'] = 'sass-lint -c ../../.sass-lint.yml -v';
    scripts['lint:ts'] = 'tslint -p tsconfig.json';
  }

  scripts.prepublishOnly = 'npm run build && npm run docs';
  return scripts;
}

module.exports = function createPackageJson({
  name,
  description,
  version,
  isPrivate,
  styles,
  sassdoc,
  typescript,
  propTypes,
  customTypes,
}) {
  let main;
  let module;
  let types;
  const files = [];
  if (typescript) {
    main = './lib/index.js';
    module = './es/index.js';
    types = './types/index.d.ts';
    files.push('es/*', 'lib/*', 'types/*');
  }

  if (styles) {
    files.push('dist/*');
  }

  return {
    name: `@react-md/${name}`,
    version,
    private: isPrivate || undefined,
    description: `${description}`,
    scripts: createScripts(styles, typescript, customTypes, sassdoc, propTypes),
    main,
    module,
    types,
    files,
    author: 'Mikkel Laursen <mlaursen03@gmail.com>',
    repository: 'https://github.com/mlaursen/react-md',
    keywords: [
      'react-md',
      'material design',
      'react',
    ],
    license: 'MIT',
  };
};
