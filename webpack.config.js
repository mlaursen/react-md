const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


function makeConfig() {
  return {
    entry: './src/js/index.js',

    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      'react-addons-css-transition-group': 'var React.addons.CSSTransitionGroup',
      'react-addons-transition-group': 'var React.addons.TransitionGroup',
    },

    module: {
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' }],
    },

    output: {
      publicPath: '/',
      path: './dist',
      library: 'ReactMD',
      libraryTarget: 'umd',
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
    ],

    resolve: {
      extensions: ['', '.js'],
    },
  };
}

const entries = {};
fs.readdirSync(path.resolve(process.cwd(), 'src', 'scss', 'bundles')).forEach(file => {
  entries[file.replace('.scss', '')] = path.resolve(process.cwd(), 'src', 'scss', 'bundles', file);
});

const devConfig = makeConfig();
devConfig.output.filename = 'react-md.js';
devConfig.devtool = 'source-map';
devConfig.plugins = devConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
    },
  }),
]);

const prodConfig = makeConfig();
prodConfig.devtool = null;
prodConfig.output.filename = 'react-md.min.js';
prodConfig.plugins = prodConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    compress: { warnings: false },
    output: { comments: false },
  }),
]);

const prodSassConfig = {
  entry: entries,
  devtool: null,
  output: {
    publicPath: '/',
    path: './dist',
    filename: 'react-md.[name].min.css',
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css!postcss!sass?outputStyle=compressed'
      ),
    }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('react-md.[name].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: { warnings: false },
      output: { comments: false },
    }),
  ],
  postcss() {
    return [autoprefixer({ browsers: ['last 2 version', 'ie >= 10'] })];
  },
};

module.exports = [devConfig, prodConfig, prodSassConfig];
