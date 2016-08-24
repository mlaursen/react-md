const webpack = require('webpack');

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
prodConfig.devtool = 'source-map';
prodConfig.output.filename = 'react-md.min.js';
prodConfig.plugins = prodConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    output: { comments: false },
  }),
]);

module.exports = [devConfig, prodConfig];
