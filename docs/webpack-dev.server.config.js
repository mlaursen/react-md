const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const config = require('./webpack.config')();
config.cache - true;
config.devtool = 'eval-source-map';

config.entry = config.__server;
config.name = 'server';
config.target = 'node';
config.externals = [nodeExternals()];

config.module.loaders = config.module.loaders.concat([config.__imgLoader('url')]);

config.output.filename = 'server.js';
config.output.path = config.__serverDist;

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
    __CLIENT__: false,
  }),
  new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'),
]);

module.exports = config;
