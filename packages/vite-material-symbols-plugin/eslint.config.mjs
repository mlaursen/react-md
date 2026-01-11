// @ts-check
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  gitignore(import.meta.url),
  ...configs.recommended({
    testFramework: "vitest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
]);
