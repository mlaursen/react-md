// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig(
  gitignore(import.meta.url),
  ...compat.config({
    extends: ["plugin:@next/next/core-web-vitals"],
  }),
  ...configs.recommendedFrontend({
    testFramework: "vitest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
  {
    // this seems to be needed to set the module/moduleResolution/target to "nodenext" + "esnext"
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
      globals: {
        process: true,
      },
    },
  },
  {
    ignores: [
      "next-env.d.ts",
      "next-env-custom.d.ts",
      "next.config.mjs",
      "**/__mocks__/**",
      "src/generated/**",
    ],
  },
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
