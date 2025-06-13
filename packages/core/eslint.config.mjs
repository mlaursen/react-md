// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";
import { join } from "node:path";

const strict = process.env.STRICT_TYPING === "true";

const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname, "jest")
  : configs.frontend("jest");

export default config(
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
    },
  }
);
