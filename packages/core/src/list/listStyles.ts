import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-list");

/** @since 6.0.0 */
export interface ListClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  horizontal?: boolean;
}

/**
 * @since 6.0.0
 */
export function list(options: ListClassNameOptions = {}): string {
  const { dense = false, horizontal = false, className } = options;

  return cnb(styles({ dense, horizontal }), className);
}
