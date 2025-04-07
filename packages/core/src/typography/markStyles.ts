import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-mark");

/**
 * @since 6.0.0
 */
export interface MarkClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function mark(options: MarkClassNameOptions = {}): string {
  const { className } = options;
  return cnb(styles(), className);
}
