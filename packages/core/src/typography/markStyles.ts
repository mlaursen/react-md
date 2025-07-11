import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-mark");

declare module "react" {
  interface CSSProperties {
    "--rmd-mark-color"?: string;
  }
}

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
