/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack(config) {
    // config.module.rules.unshift({
    //   test: /\.md$/,
    //   use: 'raw-loader',
    //   exclude: /node_modules/,
    // });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/v1/",
        destination: "https://mlaursen.github.io/react-md-v1-docs/#/",
        permanent: false,
      },
      {
        source: "/v1/:paths*",
        destination: "https://mlaursen.github.io/react-md-v1-docs/#/:paths*",
        permanent: false,
      },
    ];
  },
};
