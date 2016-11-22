const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function makeConfig() {
  const config = require('./webpack.config')();
  config.devtool = 'source-map';
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEV__: true,
    }),
  ]);

  return config;
}

const client = makeConfig();
client.entry = path.resolve(process.cwd(), 'src', 'client');
client.name = 'client';
client.target = 'web';
client.output.filename = '[name].js';
client.output.path = path.resolve(process.cwd(), 'dist', 'client');
client.module.loaders = client.module.loaders.concat([{
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=compressed'),
}, client.__imgLoader('file')]);
client.plugins = client.plugins.concat([
  new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin(client.__htmlWebpackOptions),
  new webpack.DefinePlugin({ __CLIENT__: true }),
]);


const server = makeConfig();
server.entry = ['babel-polyfill', path.resolve(process.cwd(), 'src', 'server')];
server.name = 'server';
server.target = 'node';
server.externals = [nodeExternals()];
server.module.loaders = server.module.loaders.concat([
  server.__imgLoader('url'),
]);
server.output.filename = 'server.js';
server.output.path = path.resolve(process.cwd(), 'dist', 'server');
server.plugins = server.plugins.concat([
  new webpack.DefinePlugin({ __CLIENT__: false, __DEBUG_SSR__: true }),
  new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'),
]);

module.exports = [client, server];
