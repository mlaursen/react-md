module.exports = {
  root: true,
  extends: ["@mlaursen/eslint-config", "plugin:@next/next/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    // I don't really want the image optimizations for the documentation site
    // since I use random images from other services
    "@next/next/no-img-element": 0,
    "@next/next/no-html-link-for-pages": [1, "src/pages"],

    // I only use this within dialogs which IS recommended
    "jsx-a11y/no-autofocus": 0,
  },
  overrides: [
    {
      files: ["**/route.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
      },
    },
  ],
};
