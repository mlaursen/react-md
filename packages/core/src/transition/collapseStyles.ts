import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";

const styles = bem("rmd-collapse");

/**
 * @since 6.0.0
 */
export interface CollapseClassNameOptions {
  className?: string;
  enter?: boolean;
  leave?: boolean;
  exited?: boolean;
  disableOverflow?: boolean;
}

/**
 * @since 6.0.0
 */
export function collapse(options: CollapseClassNameOptions = {}): string {
  const { enter, leave, exited, disableOverflow, className } = options;

  return cnb(
    styles({
      enter,
      leave,
      "no-overflow": disableOverflow,
    }),
    exited && DISPLAY_NONE_CLASS,
    className
  );
}
