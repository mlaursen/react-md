module.exports = {
  root: true,
  extends: '@mlaursen/eslint-config',
  globals: {
    gtag: 'readonly',
  },
  rules: {
    // only used for prop-types and easily caught
    'no-empty': 0,
  },
  overrides: [
    {
      files: [
        'packages/documentation/src/**/*.ts',
        'packages/documentation/src/**/*.tsx',
      ],
      extends: 'plugin:@next/next/recommended',
      rules: {
        '@next/next/no-html-link-for-pages': [
          1,
          'packages/documentation/src/pages',
        ],
        // I don't really want the image optimizations for the documentation site
        // since I use random images from other services
        '@next/next/no-img-element': 0,
      },
    },
    {
      files: ['packages/documentation/src/components/Demos/**/*.tsx'],
      rules: {
        // normally don't care about these for demos
        'react/no-array-index-key': 0,
      },
    },
    {
      files: ['packages/*/src/index.ts'],
      rules: {
        // I don't know how to get @module to work but it's supported by typedoc
        'tsdoc/syntax': 0,
      },
    },
  ],
};
