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
    "@typescript-eslint/consistent-type-imports": ["error"],

    // I only use this within dialogs which IS recommended
    "jsx-a11y/no-autofocus": 0,

    "object-shorthand": ["error", "always"],
  },
  overrides: [
    {
      files: ["packages/*/src/index.ts"],
      rules: {
        // I don't know how to get @module to work but it's supported by typedoc
        "tsdoc/syntax": 0,
      },
    },
  ],
};
