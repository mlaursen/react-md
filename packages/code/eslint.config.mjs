// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";
import { join } from "node:path";

export default config(
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.frontendTypeChecking(import.meta.dirname)
);
