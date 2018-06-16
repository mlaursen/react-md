const BABEL_ENV = process.env.BABEL_ENV;
const modules = typeof BABEL_ENV !== 'undefined' && BABEL_ENV !== 'cjs';

module.exports = {
  presets: [
    ['env', {
      loose: true,
      modules: modules ? false : 'commonjs',
    }],
    'stage-0',
    'react',
  ],
};
