// @ts-check
import { config, configs } from "@mlaursen/eslint-config";

export default config(...configs.typescript, {
  rules: {
    "no-console": "off",
  },
});
