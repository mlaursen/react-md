/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const WITConfig = require('./WIT.config');
const { homepage, name } = require('./package.json');
const SWOfflinePlugin = require('./src/utils/SWOfflinePlugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

dotenv.config();
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'public');
const client = path.join(src, 'client', 'index.jsx');
const modules = path.resolve(__dirname, 'node_modules');

const SERVICE_WORKER = 'service-worker.js';
const PUBLIC_URL = process.env.PUBLIC_URL || homepage;
const PROD_ENTRY = client;
const DEV_ENTRY = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', client];

const PROD_PLUGINS = [
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    comments: false,
    sourceMap: true,
  }),
  // Better caching. hash on file content instead of build time. Hashes
  // will only change on content change now
  new WebpackMd5Hash(),
  new ManifestPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['chunks', 'manifest'],
    minChunks: Infinity,
  }),
  // Create the offline html fallback page to work with the service workers.
  new HtmlWebpackPlugin({
    filename: 'offline.html',
    inject: true,
    template: path.join(src, 'utils', 'serviceWorkerTemplate.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    publicUrl: PUBLIC_URL,
  }),
  // Create a service worker for caching the static assets
  new SWPrecachePlugin({
    cacheId: name,
    // Skip hashing urls when it was already hashed by webpack
    dontCacheBustUrlsMatching: /\.\w{8}\./,
    filename: SERVICE_WORKER,
    minify: true,
    runtimeCaching: [{
      urlPattern: new RegExp(`^${PUBLIC_URL}/api`),
      handler: 'networkFirst',
    }],
    // Include the additional offline service worker hooks to redirect to the
    // offline.html page if the user has no internet connection.
    // Ideally this would use the `chunkName` of `offline` and not require the second plugin,
    // but since the manifest is extracted, it sort of breaks :/
    importScripts: [{ filename: `offline-${SERVICE_WORKER}` }],
    // Skip caching big files
    staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
  }),
  // Create the 'offline-service-worker.js' file that gets imported by the
  // main service worker. This creates an alternative offline html page to
  // use when there is no connection.
  new SWOfflinePlugin({
    cacheId: name,
    entry: path.join(src, 'offline.js'),
    filename: `offline-${SERVICE_WORKER}`,
  }),
];
const DEV_PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

module.exports = ({ production }) => {
  let publicUrl = PUBLIC_URL;
  if (!production && PUBLIC_URL === homepage) {
    publicUrl = '';
  }

  const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WITConfig)
    .development(!production);

  const extractStyles = new ExtractTextPlugin({
    filename: 'styles.[chunkhash:8].min.css',
    allChunks: true,
    disable: !production,
  });

  return {
    bail: production,
    cache: !production,
    devtool: !production ? 'cheap-module-eval-source-map' : 'source-map',
    entry: production ? PROD_ENTRY : DEV_ENTRY,
    output: {
      path: dist,
      publicPath: `${publicUrl}/`,
      filename: `[name]${!production ? '' : '.[chunkhash:8].min'}.js`,
      chunkFilename: `[name]${!production ? '' : '.[chunkhash:8].min'}.js`,
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.jsx?$/,
        include: src,
        loader: 'eslint-loader',
      }, {
        test: /\.jsx?$/,
        include: src,
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
          plugins: [
            'react-hot-loader/babel',
            'transform-decorators-legacy',
            'syntax-dynamic-import',
            'syntax-async-functions',
            'transform-regenerator',
            'lodash',
          ],
        },
      }, {
        // Loading css dependencies from dependencies (normalize.css and Prism.css)
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
        include: src,
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
        test: /\.md$/,
        include: src,
        loader: 'raw-loader',
      }, {
        test: /\.json$/,
        include: src,
        loader: 'json-loader',
      }, {
        test: /\.(woff2?|ttf|eot)$/,
        include: src,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }],
      }, {
        test: /\.svg$/,
        include: path.join(src, 'icons'),
        use: [{
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            spriteFilename: 'icon-sprites.svg',
          },
        }, {
          loader: 'svgo-loader',
        }],
      }, {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        include: src,
        exclude: /icons/,
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
      // Use async routes in production and synchronous in development
      new webpack.NormalModuleReplacementPlugin(
        /routes$/,
        `routes/${production ? 'a' : ''}sync.js`
      ),
      new webpack.NormalModuleReplacementPlugin(
        /^\.\/routes$/,
        `./${production ? 'a' : ''}sync.js`
      ),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            failOnError: true,
          },
          debug: !production,
        },
      }),
      new webpack.DefinePlugin({
        PUBLIC_URL: JSON.stringify(publicUrl),
        SERVICE_WORKER: JSON.stringify(SERVICE_WORKER),
        __DEV__: !production,
        __CLIENT__: true,
        'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
      }),
      new SpriteLoaderPlugin(),
      extractStyles,
      webpackIsomorphicToolsPlugin,
      ...(production ? PROD_PLUGINS : DEV_PLUGINS),
    ],
    resolve: {
      alias: {
        // I think it's prettier here
        /* eslint-disable quote-props */
        'globals': path.join(src, '_globals.scss'),
        'react-md': path.resolve(__dirname, '..'),
        'react': path.join(modules, 'react'),
        'react-dom': path.join(modules, 'react-dom'),
      },
      extensions: ['.js', '.jsx'],

      // resolve dependencies first and then files in src. Allows for
      // import Something from 'components/Something' instead of '../../../../compoennts/Something'
      modules: ['node_modules', 'src'],
    },
    stats: 'errors-only',
  };
};
