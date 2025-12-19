// @ts-check
import { configs, gitignore } from "@react-md/eslint-config";
import { defineConfig } from "eslint/config";
import { join } from "node:path";

export default defineConfig([
  gitignore(join(import.meta.url, "..", "..")),
  ...configs.recommendedFrontend({
    testFramework: "vitest",
    tsconfigRootDir:
      process.env.STRICT_TYPING === "true" ? import.meta.dirname : undefined,
  }),
  {
    rules: {
      "unicorn/prefer-query-selector": "off",

      "unicorn/no-negated-condition": "off",

      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "never",
          allowObjectTypes: "never",
          allowWithName: ".+Overrides$",
        },
      ],
      "react-hooks/exhaustive-deps": [
        "error",
        {
          additionalHooks: "(useIsomorphicLayoutEffect|useDevEffect)",
        },
      ],
    },
  },
]);
