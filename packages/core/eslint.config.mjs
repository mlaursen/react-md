// @ts-check
import { configs, defineConfig, gitignore } from "@react-md/eslint-config";
import { join } from "node:path";

const strict = process.env.STRICT_TYPING === "true";

const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname, "jest")
  : configs.frontend("jest");

export default defineConfig(
  gitignore(join(import.meta.url, "..", "..")),
  ...frontend,
  {
    rules: {
      "react/prop-types": "off",
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
  }
);
