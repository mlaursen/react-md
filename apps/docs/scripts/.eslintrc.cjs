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
    "no-console": 0,
  },
};
