import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-nav-group");

/**
 * @since 6.0.0
 */
export interface NavGroupClassNameOptions {
  className?: string;
  disablePadding?: boolean;
}

/**
 * @since 6.0.0
 */
export function navGroup(options: NavGroupClassNameOptions = {}): string {
  const { className, disablePadding } = options;

  return cnb(styles({ np: disablePadding }), className);
}
