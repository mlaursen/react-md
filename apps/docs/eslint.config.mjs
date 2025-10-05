// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import { configs, defineConfig, gitignore } from "@react-md/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const strict = process.env.STRICT_TYPING === "true";

const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname, "jest")
  : configs.frontend("jest");

export default defineConfig(
  gitignore(import.meta.url),
  // @ts-expect-error some eslint type mismatch
  ...compat.config({
    extends: ["plugin:@next/next/core-web-vitals"],
  }),
  ...frontend,
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
