const path = require('path');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const src = path.resolve(process.cwd(), 'src');

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
    'utils': path.join(src, 'utils'),
  },
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    fonts: {
      extensions: ['eot', 'ttf', 'woff', 'woff2'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
    style_modules: {
      extensions: ['css', 'scss'],
      filter: (module, regex, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }

        return regex.test(module.name);
      },
      path: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }

        return module.name;
      },
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }

        return module.source;
      },
    },
  },
};

