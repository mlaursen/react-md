const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config')();

config.cache = true;
config.devtool = 'eval-source-map';
config.devServer = {
  colors: true,
  devtool: config.devtool,
  historyApiFallback: true,
  host: '0.0.0.0',
  hot: true,
  contentBase: config.__clientDist,
};

config.entry = [
  'webpack-dev-server/client?http://0.0.0.0:8080',
  'webpack/hot/only-dev-server',
  config.__client,
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
config.output.path = config.__clientDist;

const webpackOptions = Object.assign({}, config.__htmlWebpackOptions, {
  alwaysWriteToDisk: false,
  filename: 'index.html',
  isomorphic: false,
  isomorphicState: null,
  isomorphicHtmlClassName: null,
});

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin(webpackOptions),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
    __CLIENT__: true,
  }),
]);

module.exports = config;
