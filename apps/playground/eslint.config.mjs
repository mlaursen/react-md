// @ts-check
import nextPlugin from "@next/eslint-plugin-next";
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  nextPlugin.configs["core-web-vitals"],
  gitignore(import.meta.url),
  ...configs.recommendedFrontend({
    testFramework: "vitest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
]);
