// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { config, configs, gitignore } from "@mlaursen/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default config(
  gitignore(import.meta.url),
  ...compat.config({
    // extends: ["plugin:@next/next/recommended"],
    extends: ["plugin:@next/next/core-web-vitals"],
  }),
  ...configs.frontend("vitest")
);
