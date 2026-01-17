// @ts-check
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";
import { join } from "node:path";

export default defineConfig([
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.typescript({
    tsconfigRootDir: import.meta.dirname,
    strictTypeChecked: process.env.STRICT_TYPING === "true",
  }),
  {
    files: ["src/**"],
    rules: {
      "no-console": "off",
    },
  },
]);
