import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-layout-nav");

/**
 * @since 6.0.0
 */
export interface LayoutNavClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the nav should appear below the fixed app bar.
   *
   * @defaultValue `false`
   */
  appBarOffset?: boolean;
}

/**
 * @since 6.0.0
 */
export function layoutNav(options: LayoutNavClassNameOptions = {}): string {
  const { className, appBarOffset } = options;

  return cnb(styles({ "offset-v": appBarOffset }), className);
}
