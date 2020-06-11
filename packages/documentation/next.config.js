const { execSync } = require('child_process');
const withImages = require('next-images');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const commitHash = isProduction
  ? execSync('git rev-parse HEAD').toString().trim()
  : 'master';

// Note: this _might_ cause problems for scoped packages since they
// aren't always published together right now
const rmdVersion = isProduction
  ? require('../../lerna.json').version
  : 'latest';

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
          RMD_VERSION: JSON.stringify(rmdVersion),
        },
      })
    );

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  },
});

module.exports = withImages(withCustomConfig());
