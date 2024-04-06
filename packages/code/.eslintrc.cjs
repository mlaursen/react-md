module.exports = {
  root: true,
  extends: ["@mlaursen/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["src/**/index.ts"],
      rules: {
        // I don't know how to get @module to work but it's supported by typedoc
        "tsdoc/syntax": 0,
      },
    },
    {
      files: ["**/__tests__/**"],
      rules: {
        "jsx-a11y/anchor-has-content": 0,
        "jsx-a11y/click-events-have-key-events": 0,
      },
    },
  ],
};
