// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  gitignore(import.meta.url),
  ...compat.config({
    // extends: ["plugin:@next/next/recommended"],
    extends: ["plugin:@next/next/core-web-vitals"],
  }),
  ...configs.recommendedFrontend({
    testFramework: "vitest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
]);
