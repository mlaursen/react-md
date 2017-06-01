const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function makeConfig() {
  const config = require('./webpack.config')();
  config.__htmlWebpackOptions = Object.assign({}, config.__htmlWebpackOptions, {
    googleAnalytics: 'UA-76079335-1',
  });

  return config;
}

const clientPath = path.resolve(process.cwd(), 'dist', 'client');

const client = makeConfig();
client.entry = path.resolve(process.cwd(), 'src', 'client');
client.name = 'client';
client.target = 'web';
client.output.filename = '[name].[chunkhash].min.js';
client.output.chunkFilename = '[name].[chunkhash].chunk.min.js';
client.output.path = clientPath;
client.module.loaders = client.module.loaders.concat([{
  test: /\.scss$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?outputStyle=compressed'),
}, client.__imgLoader('file')]);
client.plugins = client.plugins.concat([
  new ExtractTextPlugin('[name].[hash].min.css', {
    allChunks: true,
  }),
  new HtmlWebpackPlugin(client.__htmlWebpackOptions),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: { screw_ie8: true, warnings: false },
    output: { comments: false },
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
    __DEV__: false,
    __CLIENT__: true,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[chunkhash].min.js',
    minChunks: Infinity,
  }),
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
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
    __DEV__: false,
    __CLIENT__: false,
    __DEBUG_SSR__: false,
  }),
  new webpack.NormalModuleReplacementPlugin(/\.scss$/, 'node-noop'),
  new CopyWebpackPlugin([{
    from: 'src/robots.txt',
    to: clientPath,
  }]),
]);

module.exports = [client, server];
