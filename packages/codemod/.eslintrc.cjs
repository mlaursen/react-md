module.exports = {
  root: true,
  extends: ["@mlaursen/eslint-config"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.0.0",
    },
  },
  rules: {
    "tsdoc/syntax": 0,
  },
};
