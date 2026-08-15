// @ts-check
import { join } from "node:path";

import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.recommendedFrontend({
    testFramework: "jest",
    tsconfigRootDir: import.meta.dirname,
    strictTypeChecked: process.env.STRICT_TYPING === "true",
  }),
]);
