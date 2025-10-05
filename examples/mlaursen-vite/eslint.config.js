// @ts-check
import { configs, defineConfig, gitignore } from "@mlaursen/eslint-config";

export default defineConfig(
  gitignore(import.meta.url),
  ...configs.frontend("vitest")
);
