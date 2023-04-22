module.exports = {
  root: true,
  extends: ["@mlaursen/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error"],
  },
  overrides: [
    {
      files: ["src/**/index.ts"],
      rules: {
        // I don't know how to get @module to work but it's supported by typedoc
        "tsdoc/syntax": 0,
      },
    },
  ],
};
