/* eslint-disable import/no-duplicates */

declare module "postcss-combine-duplicated-selectors" {
  import { Plugin } from "postcss";

  const plugin: Plugin<{}>;

  export default plugin;
}

declare module "postcss-flexbugs-fixes" {
  import { Plugin } from "postcss";

  function plugin(): Plugin<{}>;

  export default plugin;
}

declare module "postcss-preset-env" {
  import { Plugin } from "postcss";

  function plugin(options: {}): Plugin<{}>;

  export default plugin;
}

declare module "postcss-sorting" {
  import { Plugin } from "postcss";

  function plugin(options: {}): Plugin<{}>;

  export default plugin;
}
