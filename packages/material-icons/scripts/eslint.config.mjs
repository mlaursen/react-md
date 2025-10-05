// @ts-check
import { configs, defineConfig } from "@react-md/eslint-config";

export default defineConfig(...configs.typescript, {
  rules: {
    "no-console": "off",
  },
});
