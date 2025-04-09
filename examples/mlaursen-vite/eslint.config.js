import { config, configs, gitignore } from "@mlaursen/eslint-config";

export default config(
  gitignore(import.meta.url),
  ...configs.typescript,
  ...configs.react,
  ...configs.jsxA11y,
  ...configs.jestDom,
  ...configs.testingLibraryReact
);
