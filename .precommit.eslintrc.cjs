module.exports = {
  extends: ["./.eslintrc.cjs"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/consistent-type-imports": ["error"],
      },
    },
  ],
};
