// @ts-check
import { configs, defineConfig, gitignore } from "@react-md/eslint-config";
import { join } from "node:path";

const strict = process.env.STRICT_TYPING === "true";

const typescript = strict
  ? configs.typescriptTypeChecking(import.meta.dirname)
  : configs.typescript;

export default defineConfig(
  gitignore(join(import.meta.url, "..", "..")),
  ...typescript,
  {
    files: ["src/**"],
    rules: {
      "no-console": "off",
    },
  }
);
