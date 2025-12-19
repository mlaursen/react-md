// @ts-check
import { configs } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...configs.typescript({
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
  {
    rules: {
      "no-console": "off",
    },
  },
]);
