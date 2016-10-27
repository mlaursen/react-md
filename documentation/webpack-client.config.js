/* eslint-disable no-underscore-dangle, no-param-reassign */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config')();

config.cache = true;
config.devtool = 'eval-source-map';

config.entry = [
  'webpack-hot-middleware/client',
  'webpack/hot/only-dev-server',
  './src/client/index',
];

config.module.loaders.some(loader => {
  if (loader.loader === 'babel') {
    loader.loader = `react-hot!${loader.loader}`;
    return true;
  }

  return false;
});

config.module.loaders = config.module.loaders.concat([{
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: 'style!css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap',
}, config.__imgLoader('file')]);

config.output.filename = '[name].js';
config.output.path = path.resolve(process.cwd(), 'dist', 'client');

const htmlOptions = Object.assign({}, config.__htmlWebpackOptions, {
  filename: 'index.html',
  isomorphic: false,
  isomorphicState: null,
  isomorphicHtmlClassName: null,
});

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(htmlOptions),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
    __CLIENT__: true,
  }),
]);

module.exports = config;
