import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-menu");

/**
 * @since 6.0.0
 */
export interface MenuClassNameOptions {
  className?: string;
  horizontal?: boolean;
  elevated?: boolean;
}

/**
 * @since 6.0.0
 */
export function menu(options: MenuClassNameOptions = {}): string {
  const { className, horizontal, elevated } = options;

  return cnb(styles({ horizontal, elevated }), className);
}
