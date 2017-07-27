/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = path.resolve(process.cwd(), 'src', 'index.jsx');
const dist = path.resolve(process.cwd(), 'public');

const PROD_PLUGINS = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      drop_console: true,
    },
    output: { comments: false },
    sourceMap: false,
  }),
];

const DEV_PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
];

module.exports = function build({ production }) {
  const extractStyles = new ExtractTextPlugin({
    filename: 'styles-[hash].min.css',
    allChunks: true,
    disable: !production,
  });

  return {
    cache: !production,
    devtool: production ? 'hidden-source-map' : 'eval-source-map',
    devServer: production ? undefined : {
      contentBase: dist,
      compress: true,
      inline: true,
      hot: true,
      port: 3000,
      distPath: '/',
      stats: 'errors-only',
      historyApiFallback: true,
    },
    entry: production ? client : ['react-hot-loader/patch', client],
    output: {
      path: dist,
      publicPath: '/',
      filename: `[name]${production ? '-[hash].min' : ''}.js`,
      chunkFilename: `[name]${production ? '-[chunkhash].min' : ''}.js`,
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules|htmlTemplate/,
        loader: 'eslint-loader',
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractStyles.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: production ? 'compressed' : 'expanded',
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      }, {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url-loader?limit=10000',
        exclude: /node_modules|SVGIcon\/icons/,
      }],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnError: true,
          },
          context: '/',
          debug: !production,
          postcss: [autoprefixer],
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'chunks',
        filename: `chunks-[hash]${production ? '.min' : ''}.js`,
      }),
      new webpack.DefinePlugin({
        __DEV__: !production,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      }),
      extractStyles,
      new HtmlWebpackPlugin({
        title: 'react-md with webpack 2',
        inject: false,
        template: path.resolve(process.cwd(), 'src', 'setup', 'htmlTemplate.js'),
        appMountId: 'app',
        favicon: path.resolve(process.cwd(), 'src', 'favicon.ico'),
        externalCSS: [
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700%7CMaterial+Icons',
        ],
        externalJS: [
          // any umd builds
        ],
      }),
      ...(production ? PROD_PLUGINS : DEV_PLUGINS),
    ],
    resolve: {
      alias: {
        globals: path.resolve(process.cwd(), 'src', '_globals.scss'),
      },
      extensions: ['.js', '.jsx'],
      mainFiles: ['index', 'index.jsx'],
      modules: [
        'node_modules',
        'src',
      ],
    },
    stats: 'errors-only',
  };
};
