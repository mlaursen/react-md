// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { configs, defineConfig, gitignore } from "@mlaursen/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  gitignore(import.meta.url),
  // @ts-expect-error some eslint typedef mismatch
  ...compat.config({
    // extends: ["plugin:@next/next/recommended"],
    extends: ["plugin:@next/next/core-web-vitals"],
  }),
  ...configs.frontend("jest")
);
