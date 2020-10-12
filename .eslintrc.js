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
      files: ['packages/documentation/src/components/Demos/**/*.tsx'],
      rules: {
        // normally don't care about these for demos
        'react/no-array-index-key': 0,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/prefer-reduce-type-parameter': 0,
        // used for dynamic prop-types and easy to catch otherwise
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
      },
    },
  ],
};
