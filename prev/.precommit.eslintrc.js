module.exports = {
  extends: ['./.eslintrc.js'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['error'],
      },
    },
  ],
};
