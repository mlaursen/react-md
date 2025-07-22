// @ts-check
import { config, configs } from "@react-md/eslint-config";

export default config(...configs.typescript, {
  rules: {
    "no-console": "off",
  },
});
