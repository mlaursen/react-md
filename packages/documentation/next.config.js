const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withImages = require('next-images');

const isProduction = process.env.NODE_ENV === 'production';
const root = path.resolve(process.cwd(), '..', '..');
const nodeModules = 'node_modules';
const withCustomConfig = (nextConfig = {}) => ({
  ...nextConfig,
  poweredByHeader: false,
  webpack(config, options) {
    if (options.isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
        })
      );
    }

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
  withTypescript(
    withCustomConfig(
      withCSS(
        withSass({
          sassLoaderOptions: {
            sourceMap: !isProduction,
            includePaths: [path.join(root, nodeModules)],
          },
          postcssLoaderOptions: {
            ident: 'postcss',
            sourceMap: !isProduction,
          },
        })
      )
    )
  )
);
