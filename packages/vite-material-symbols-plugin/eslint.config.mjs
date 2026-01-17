// @ts-check
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  gitignore(import.meta.url),
  ...configs.recommended({
    testFramework: "vitest",
    tsconfigRootDir: import.meta.dirname,
    strictTypeChecked: process.env.STRICT_TYPING === "true",
  }),
]);
