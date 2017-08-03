const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const src = path.resolve(process.cwd(), 'src');

const REGEX = /export default __webpack_public_path__ \+ "(.*)";/;

module.exports = {
  // debug: true,
  // webpack_assets_file_path: 'webpack-assets.json',
  // webpack_stats_file_path: 'webpack-stats.json',
  alias: {
    /* eslint-disable quote-props */
    'react-md': path.resolve(process.cwd(), '..'),
    'constants': path.join(src, 'constants'),
    'components': path.join(src, 'components'),
    'imgs': path.join(src, 'imgs'),
    'routes': path.join(src, 'routes', 'sync.js'),
    'sagas': path.join(src, 'sagas'),
    'server': path.join(src, 'server'),
    'state': path.join(src, 'state'),
    'propTypes': path.join(src, 'propTypes'),
    'utils': path.join(src, 'utils'),
  },
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
      filter(module, regex) {
        return regex.test(module.name) && !module.name.match(/raw-loader/);
      },
      parser(module, options, log) {
        if (REGEX.test(module.source)) {
          return module.source.replace(REGEX, `${options.webpack_stats.publicPath}$1`);
        }

        return WebpackIsomorphicToolsPlugin.urlLoaderParser(module, options, log);
      },
    },
    fonts: {
      extensions: ['eot', 'ttf', 'woff', 'woff2'],
      parser: WebpackIsomorphicToolsPlugin.urlLoaderParser,
    },
    styles: {
      extensions: ['css', 'scss'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.styleLoaderFilter(module, regex, options, log);
        }

        return regex.test(module.name);
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.styleLoaderPathExtractor(module, options, log);
        }

        return module.name;
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.cssModulesLoaderParser(module, options, log);
        }

        return module.source;
      },
    },
  },
};

