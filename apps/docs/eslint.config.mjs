// @ts-check
import nextPlugin from "@next/eslint-plugin-next";
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  nextPlugin.configs["core-web-vitals"],
  gitignore(import.meta.url),
  ...configs.recommendedFrontend({
    testFramework: "vitest",
    tsconfigRootDir: import.meta.dirname,
    strictTypeChecked: process.env.STRICT_TYPING === "true",
  }),
  {
    files: ["**/(demos)/**"],
    rules: {
      // I want demos and examples to prioritize other things
      "@typescript-eslint/no-use-before-define": "off",
    },
  },
  {
    files: [
      "**/(demos)/**",
      "src/components/FilePreview/SimpleFilePreview.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  }
);
