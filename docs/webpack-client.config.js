/* eslint-disable no-underscore-dangle, no-param-reassign */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config')();

config.cache = true;
config.devtool = 'source-map';

config.entry = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  './src/client/index',
];

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
