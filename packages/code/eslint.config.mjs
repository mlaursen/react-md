// @ts-check
import { configs, defineConfig, gitignore } from "@react-md/eslint-config";
import { join } from "node:path";

export default defineConfig(
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.frontendTypeChecking(import.meta.dirname, "jest")
);
