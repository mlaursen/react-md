module.exports = {
  root: true,
  extends: ["@mlaursen/eslint-config", "plugin:@next/next/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["packages/*/src/index.ts"],
      rules: {
        // I don't know how to get @module to work but it's supported by typedoc
        "tsdoc/syntax": 0,
      },
    },
    {
      files: ["scripts/**"],
      rules: {
        "no-console": 0,
      },
    },
  ],
};
