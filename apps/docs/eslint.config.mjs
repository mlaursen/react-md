// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";

const strict = process.env.STRICT_TYPING === "true";

const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname)
  : configs.frontend;

export default config(
  gitignore(import.meta.url),
  ...frontend,
  ...configs.next,
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
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
    },
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
