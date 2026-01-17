// @ts-check
import { configs } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...configs.typescript({
    tsconfigRootDir: import.meta.dirname,
    strictTypeChecked: process.env.STRICT_TYPING === "true",
  }),
  {
    rules: {
      "no-console": "off",
    },
  },
]);
