import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-window-splitter");

/**
 * @since 6.0.0
 */
export interface WindowSplitterClassNameOptions {
  className?: string;
  dragging?: boolean;
  reversed?: boolean;
  vertical?: boolean;
  disableFixed?: boolean;
}

/**
 * @since 6.0.0
 */
export function windowSplitter(
  options: WindowSplitterClassNameOptions = {}
): string {
  const {
    vertical = false,
    dragging,
    reversed,
    disableFixed,
    className,
  } = options;

  return cnb(
    styles({
      h: !vertical,
      hr: !vertical && reversed,
      v: vertical,
      vr: vertical && reversed,
      a: disableFixed,
      dragging,
    }),
    className
  );
}
