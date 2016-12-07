const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (prod) => ({
  entry: [
    'babel-polyfill',
    path.resolve(process.cwd(), 'src', 'server', 'index.js'),
  ],
  eslint: {
    configFile: path.resolve(process.cwd(), '.eslintrc'),
  },
  externals: [nodeExternals()],
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint',
    }],

    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'server.js',
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      constants: path.resolve(process.cwd(), '..', 'docs', 'src', 'shared', 'constants'),
      utils: path.resolve(process.cwd(), '..', 'docs', 'src', 'shared', 'utils'),
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: !prod,
      'process.env': {
        NODE_ENV: JSON.stringify(prod ? 'production' : 'development'),
      },
    }),
  ],
  target: 'node',
});
