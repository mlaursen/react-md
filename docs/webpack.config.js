'use strict';
/*eslint-env node*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const DEV_CONFIG = require('./webpack-dev.config.js');
const buildFolder = path.resolve(__dirname, 'src/www');

const env = {
  developent: NODE_ENV === 'developent' || typeof NODE_ENV === 'undefined',
  production: NODE_ENV === 'production',
};

const fileSuffix = env.production ? '.min' : '';

let config = {
  entry: [
    './src/js/index.js',
  ],

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint',
      include: [path.resolve(__dirname, '../src/js')],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: 'sasslint',
      include: [path.resolve(__dirname, '../src/scss')],
      exclude: /node_modules/,
    }],

    loaders: [],

    noParse: /\.min\.js/,
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.txt'],
    alias: {
      'react-md': path.resolve(__dirname, '../src/js'),
    },
  },

  output: {
    path: buildFolder,
    filename: `bundle${fileSuffix}.js`,
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, 'src/www/index.html'),
    }),
  ],
};

const sassConfig = `outputStyle=${env.developent ? 'expanded&sourceMap=true' : 'compressed'}`;
const jsLoader = `${env.developent ? 'react-hot!' : ''}babel`;
if(env.developent) {
  const DEV_URL = `http://${DEV_CONFIG.host || 'localhost'}:${DEV_CONFIG.port || 3000}`;
  config.devtool = 'eval';
  config.entry = config.entry.concat([
    `webpack-dev-server/client?${DEV_URL}`,
    'webpack/hot/only-dev-server',
  ]);
  config.cache = true;

  config.devServer = {
    contentBase: buildFolder,
    devtool: 'eval',
    hot: true,
  };

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: DEV_URL }),
  ]);
}

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: jsLoader,
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(`style!css!autoprefixer?browsers=last 2 versions!sass?${sassConfig}`),
}]);

module.exports = config;
