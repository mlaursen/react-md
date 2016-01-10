'use strict';
/*eslint-env node*/
const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const buildFolder = path.resolve(__dirname, 'src/www');
const js = path.resolve(__dirname, '../src/js');
const scss = path.resolve(__dirname, '../src/scss');

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
      loader: 'eslint-loader',
      include: [js],
      exclude: /node_modules/,
    }, {
      test: /\.scss$/,
      loader: 'sasslint',
      include: [scss],
      exclude: /node_modules/,
    }],

    loaders: [],

    noParse: /\.min\.js$/,
  },

  modulesDirectories: [
    path.resolve(__dirname, 'node_modules'),
    'node_modules',
    js,
    scss,
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.txt'],
    alias: {
      // Weird issue where I was getting 2 versions of react.
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-md': js,
      'react-md-scss': scss,
      'react-md-documentation': path.resolve(__dirname, 'src/js/Documentation'),
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

  eslint: {
    configFile: '../.eslintrc',
  },
};

const sassConfig = `outputStyle=${env.developent ? 'expanded&sourceMap=true' : 'compressed'}`;
const jsLoader = `${env.developent ? 'react-hot!' : ''}babel`;
if(env.developent) {
  const host = 'localhost';
  const port = 3000;
  const DEV_URL = `http://${host}:${port}`;
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
    port: port,
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
  loader: `style!css!autoprefixer?browsers=last 2 versions!sass?${sassConfig}`,
}]);

module.exports = config;
