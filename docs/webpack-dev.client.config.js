const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config')();

config.cache = true;
config.devtool = 'eval-source-map';
config.entry = [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client',
  'babel-polyfill',
  config.__client,
];

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'react-hot!babel',
}, {
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: 'style!css!postcss!sass?outputStyle=expanded&sourceMap',
}, config.__imgLoader('file')]);

config.output.filename = '[name].js';
config.output.path = config.__clientDist;

const webpackOptions = Object.assign({}, config.__htmlWebpackOptions, {
  filename: 'index.html',
  isomorphic: false,
  isomorphicState: null,
});

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(webpackOptions),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
]);

module.exports = config;
