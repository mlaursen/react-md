import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-table");

/** @since 6.0.0 */
export interface TableClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  fullWidth?: boolean;
}

/**
 * @since 6.0.0
 */
export function table(options: TableClassNameOptions = {}): string {
  const { dense = false, fullWidth = false, className } = options;

  return cnb(styles({ dense, "full-width": fullWidth }), className);
}
