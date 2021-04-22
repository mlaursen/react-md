const withImages = require('next-images');

const withCustomConfig = (nextConfig = {}) => {
  /**
   * @type import('next/dist/next-server/server/config-shared').NextConfig
   */
  const config = {
    ...nextConfig,
    future: {
      webpack5: true,
      strictPostcssConfiguration: true,
    },
    distDir: 'build',
    poweredByHeader: false,
    compress: false,
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
  };

  return config;
};

module.exports = withImages(withCustomConfig());
