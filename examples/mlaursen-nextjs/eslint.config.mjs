// @ts-check
import { config, configs, gitignore } from "@mlaursen/eslint-config";

export default config(
  gitignore(import.meta.url),
  ...configs.frontend,
  ...configs.next
);
