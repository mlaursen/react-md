/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const client = './src/client/index.jsx';
const dist = path.resolve(process.cwd(), 'public', 'assets');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const WITConfig = require('./WIT.config');

const modules = path.resolve(process.cwd(), 'node_modules');

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

module.exports = ({ production }) => {
  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WITConfig)
    .development(!production);

  const extractStyles = new ExtractTextPlugin({
    filename: 'styles-[hash].min.css',
    allChunks: true,
    disable: !production,
  });

  return {
    cache: !production,
    devtool: !production ? 'eval' : 'hidden-source-map',
    entry: !production ? ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', client] : client,
    output: {
      path: dist,
      publicPath: '/assets/',
      filename: `[name]${!production ? '' : '-[hash].min'}.js`,
      chunkFilename: `[name]${!production ? '' : '-[chunkhash].min'}.js`,
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules|react-md\/lib/,
        loader: 'eslint-loader',
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules|react-md\/lib/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 versions', 'safari >= 7'],
              },
              modules: false,
            }],
            'react',
            'stage-0',
          ],
          plugins: ['react-hot-loader/babel', 'transform-decorators-legacy'],
        },
      }, {
        test: /\.css$/,
        loader: extractStyles.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractStyles.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer],
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: !production ? 'expanded' : 'compressed',
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /(\.md|(logo|404)\.svg)$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      }, {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      }, {
        test: /\.(woff2?|ttf|eot|svg)$/,
        exclude: /node_modules|(logo|404)\.svg/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }],
      }],
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /routes$/,
        `routes/${production ? 'a' : ''}sync.js`
      ),
      new webpack.NormalModuleReplacementPlugin(
        /\.\/routes$/,
        `./${production ? 'a' : ''}sync.js`
      ),
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
        filename: `chunks${!production ? '' : '-[hash].min'}.js`,
      }),
      new webpack.DefinePlugin({
        __DEV__: !production,
        __CLIENT__: true,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      }),
      extractStyles,
      webpackIsomorphicToolsPlugin,
      ...(production ? PROD_PLUGINS : DEV_PLUGINS),
    ],
    resolve: {
      alias: {
        // I think it's prettier here
        /* eslint-disable quote-props */
        'globals': path.resolve(process.cwd(), 'src', '_globals.scss'),
        'react-md': path.resolve(process.cwd(), '..'),
        'react': path.join(modules, 'react'),
        'react-dom': path.join(modules, 'react-dom'),
        'react-addons-css-transition-group': path.join(modules, 'react-addons-css-transition-group'),
        'react-addons-transition-group': path.join(modules, 'react-addons-transition-group'),
      },
      extensions: ['.js', '.jsx'],
      modules: ['node_modules', 'src'],
    },
    stats: 'errors-only',
  };
};
