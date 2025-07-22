// @ts-check
import { config, configs, gitignore } from "@react-md/eslint-config";
import { join } from "node:path";

const strict = process.env.STRICT_TYPING === "true";

const typescript = strict
  ? configs.typescriptTypeChecking(import.meta.dirname)
  : configs.typescript;

export default config(
  gitignore(join(import.meta.url, "..", "..")),
  ...typescript,
  {
    files: ["src/scripts/**"],
    rules: {
      "no-console": "off",
    },
  }
);
