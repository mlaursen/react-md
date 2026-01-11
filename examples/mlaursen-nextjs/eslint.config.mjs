// @ts-check
import { configs, gitignore } from "@mlaursen/eslint-config";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  nextPlugin.configs["core-web-vitals"],
  gitignore(import.meta.url),
  ...configs.recommendedFrontend({
    testFramework: "jest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
]);
