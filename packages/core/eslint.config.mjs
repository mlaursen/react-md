// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";
import { join } from "node:path";

// eslint-disable-next-line no-undef
const strict = process.env.STRICT_TYPING === "true";

const frontend = strict
  ? configs.frontendTypeChecking(import.meta.dirname)
  : configs.frontend;

export default config(
  gitignore(join(import.meta.url, "..", "..")),
  ...frontend
);
