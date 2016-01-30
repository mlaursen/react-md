'use strict';
/*eslint-env node*/
const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const buildFolder = path.resolve(__dirname, 'src/www');
const js = path.resolve(__dirname, '../src/js');
const scss = path.resolve(__dirname, '../src/scss');

const env = {
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined',
  production: NODE_ENV === 'production',
};

//const fileSuffix = env.production ? '.min' : '';

let config = {
  entry: [
    './src/app/index.js',
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

    loaders: [{
      test: /\.md$/,
      exclude: /node_modules/,
      loader: 'raw',
    }],

    noParse: /\.min\.js$/,
  },

  modulesDirectories: [
    path.resolve(__dirname, 'node_modules'),
    'node_modules',
    js,
    scss,
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.md'],
    alias: {
      // Weird issue where I was getting 2 versions of react.
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react-md/lib': js,
      'react-md-scss': scss,
      'react-md-documentation': path.resolve(__dirname, 'src/app/Documentation'),
    },
  },

  output: {
    path: buildFolder,
    filename: `bundle.js`,
    //filename: `bundle${fileSuffix}.js`,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
      },
    }),
  ],
  eslint: {
    configFile: '../.eslintrc',
  },
};

const sassConfig = `outputStyle=${env.development ? 'expanded&sourceMap=true' : 'compressed'}`;
if(env.development) {
  const host = 'localhost';
  const port = 8080;
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

  config.module.loaders = config.module.loaders.concat([{
    test: /\.jsx?$/,
    exclude: /node_modules|react-md/,
    loader: 'react-hot!babel',
  }]);
} else if(env.production) {
  config.devtool = 'source-map';
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    // Prevents any page navigation for some reason. GOtta figure that out
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: { warnings: false },
    //  output: { comments: false },
    //}),
  ]);
}

config.module.loaders = config.module.loaders.concat([{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
}, {
  test: /\.scss$/,
  loader: `style!css!autoprefixer?browsers=last 2 versions!sass?${sassConfig}`,
}]);

module.exports = config;
