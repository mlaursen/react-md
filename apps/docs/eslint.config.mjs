// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";

export default config(
  gitignore(import.meta.url),
  ...configs.frontendTypeChecking(import.meta.dirname),
  {
    // this seems to be needed to set the module/moduleResolution/target to "nodenext" + "esnext"
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
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
  }
);
