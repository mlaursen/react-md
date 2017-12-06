const BABEL_ENV = process.env.BABEL_ENV;
const modules = typeof BABEL_ENV !== 'undefined' && BABEL_ENV !== 'cjs';
const transformImports = require('babel-plugin-transform-imports');

const plugins = [
  [transformImports, {
    'react-md': {
      transform: `react-md/${modules ? 'es' : 'lib'}\${member}`,
      preventFullImport: true,
    },
  }],
];

module.exports = {
  presets: [
    ['env', {
      loose: true,
      modules: modules ? false : 'commonjs',
    }],
    'stage-0',
    'react',
  ],
  plugins,
};
