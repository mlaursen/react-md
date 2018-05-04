const env = require('@babel/preset-env').default;
const react = require('@babel/preset-react').default;
const typescript = require('@babel/preset-typescript');

const BROWSER_ENV_CONFIG = {
  modules: false,
  targets: {
    browsers: [
      'last 2 versions',
      'safari >= 7',
    ],
  },
};

const NODE_ENV_CONFIG = {
  targets: {
    node: '6',
  },
};

module.exports = function (api) {
  api.cache(function () {
    return process.env.NODE_ENV;
  });

  var nodeEnv = process.env.NODE_ENV;
  var babelEnv = process.env.BABEL_ENV;
  var isDev = nodeEnv === 'development';
  var isProd = nodeEnv === 'production';
  var isTest = nodeEnv === 'test' || babelEnv === 'test';
  var isNode = isTest || babelEnv === 'node';
  var isCommonJS = babelEnv === 'commonjs'

  var envConfig = BROWSER_ENV_CONFIG;
  if (isNode) {
    envConfig = NODE_ENV_CONFIG;
  } else if (isCommonJS) {
    envConfig = Object.assign({}, BROWSER_ENV_CONFIG, {
      modules: 'commonjs',
    });
  }

  return {
    presets: [
      typescript,
      [env, envConfig],
      react,
    ],
    plugins: [
      require('babel-plugin-transform-class-properties'),
    ].filter(Boolean),
  };
}
