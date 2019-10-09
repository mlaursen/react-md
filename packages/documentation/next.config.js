const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

const isProduction = process.env.NODE_ENV === 'production';
const withCustomConfig = (nextConfig = {}) => ({
  ...nextConfig,
  poweredByHeader: false,
  webpack(config, options) {
    config.module.rules.unshift({
      test: /\.md$/,
      use: 'raw-loader',
      exclude: /node_modules/,
    });

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});

module.exports = withImages(
  withCustomConfig(
    withCSS(
      withSass({
        sassLoaderOptions: {
          sourceMap: !isProduction,
        },
        postcssLoaderOptions: {
          ident: 'postcss',
          sourceMap: !isProduction,
        },
      })
    )
  )
);
