const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const nodeModules = path.resolve(process.cwd(), 'node_modules');
const src = path.resolve(process.cwd(), 'src');
const shared = path.join(src, 'shared');

module.exports = () => ({
  __htmlWebpackOptions: {
    alwaysWriteToDisk: true,
    filename: 'index.ejs',
    inject: false,
    template: path.resolve(process.cwd(), 'src', 'template.js'),
    favicon: path.resolve(process.cwd(), 'src', 'client', 'favicon.ico'),

    title: 'react-md',
    appMountId: 'app',
    isomorphic: 'html',
    isomorphicState: {
      var: '__INITIAL_STATE__',
      val: 'initialState',
    },
    isomorphicHtmlClassName: 'htmlClassName',
    description: 'Google\'s Material Design UI components built with React and sass.',
    keywords: 'material design,react,sass,material,ui,components,material-design',
  },

  __imgLoader: (loader) => ({
    test: /\.(png|jpe?g|svg)$/,
    exclude: /node_modules/,
    loader: loader + '?name=imgs/[hash].[ext]!image-webpack',
  }),

  __client: path.resolve(process.cwd(), 'src', 'client', 'index.jsx'),
  __clientDist: path.resolve(process.cwd(), 'dist', 'client'),
  __server: path.resolve(process.cwd(), 'src', 'server', 'index.js'),
  __serverDist: path.resolve(process.cwd(), 'dist', 'server'),

  eslint: {
    configFile: path.resolve(process.cwd(), '.eslintrc'),
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      exclude: /(node_modules|lib)/,
    }],

    loaders: [{
      test: /\.md$/,
      exclude: /node_modules/,
      loader: 'raw',
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json',
    }],
  },

  output: {
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.md'],
    alias: {
      // prevents multiple react versions when linked
      'react': path.join(nodeModules, 'react'),
      'react-dom': path.join(nodeModules, 'react-dom'),
      'react-md': path.resolve(process.cwd(), '..'),
      'md-scss': path.resolve(process.cwd(), '..', 'src', 'scss', 'react-md.scss'),
      'react-md-scss': path.resolve(process.cwd(), '..', 'src2', 'scss', '_react-md.scss'),
      'react-doc-page': path.resolve(process.cwd(), 'src', 'shared', 'components', 'DocPage.jsx'),

      'sass-utils': path.join(shared, '_sass-utils.scss'),
      'actions': path.join(shared, 'actions'),
      'components': path.join(shared, 'components'),
      'constants': path.join(shared, 'constants'),
      'containers': path.join(shared, 'containers'),
      'docgens': path.join(src, 'docgens'),
      'examples': path.join(src, 'examples'),
      'reducers': path.join(shared, 'reducers'),
      'routes': path.join(shared, 'routes'),
      'stores': path.join(shared, 'stores'),
      'utils': path.join(shared, 'utils'),
    },

    // Fixes the npm link issue so that it doesn't search for modules in react-md
    fallback: nodeModules,
  },

  // Fixes the npm link issue so that it doesn't search for modules in react-md
  resolveLoader: {
    fallback: nodeModules,
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackHarddiskPlugin(), // always write the HtmlWebpackPlugin to Disk,
  ],

  postcss() {
    return [autoprefixer({ browsers: ['last 2 version', 'ie >= 10'] })];
  },
});
