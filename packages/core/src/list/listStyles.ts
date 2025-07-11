import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-list");

declare module "react" {
  interface CSSProperties {
    "--rmd-list-padding-h"?: string | number;
    "--rmd-list-padding-v"?: string | number;
  }
}

/** @since 6.0.0 */
export interface ListClassNameOptions {
  className?: string;

  /**
   * Set to `true` to decrease the amount of padding and font size within the
   * list.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Set this to `true` to render horizontally instead of vertically.
   *
   * @defaultValue `false`
   */
  horizontal?: boolean;
}

/**
 * @since 6.0.0
 */
export function list(options: ListClassNameOptions = {}): string {
  const { dense = false, horizontal = false, className } = options;

  return cnb(styles({ dense, horizontal }), className);
}
