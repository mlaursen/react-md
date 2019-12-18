const { execSync } = require('child_process');
const withSass = require('@zeit/next-sass');
const { resolve } = require('path');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const commitHash = isProduction
  ? execSync('git rev-parse HEAD')
      .toString()
      .trim()
  : 'master';

const withCustomConfig = (nextConfig = {}) => ({
  ...nextConfig,
  poweredByHeader: false,
  webpack(config, options) {
    config.module.rules.unshift({
      test: /\.md$/,
      use: 'raw-loader',
      exclude: /node_modules/,
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          COMMIT_SHA: JSON.stringify(commitHash),
        },
      })
    );

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
          includePaths: [resolve(process.cwd(), 'src')],
        },
        postcssLoaderOptions: {
          ident: 'postcss',
          sourceMap: !isProduction,
        },
      })
    )
  )
);
