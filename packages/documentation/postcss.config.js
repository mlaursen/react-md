module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    // require('postcss-sorting')({
    //   order: ['custom-properties', 'declarations'],
    //   'properties-order': 'alphabetical',
    //   'unspecified-properties-position': 'bottom',
    // }),
  ],
};
