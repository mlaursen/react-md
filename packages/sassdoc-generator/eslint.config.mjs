// @ts-check
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";
import { join } from "node:path";

export default defineConfig([
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.typescript({
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
  {
    files: ["src/**"],
    rules: {
      "no-console": "off",
    },
  },
]);
