import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";
import { DISPLAY_NONE_CLASS } from "./utils.js";

const styles = bem("rmd-collapse");

/**
 * @remarks \@since 6.0.0
 */
export interface CollapseClassNameOptions {
  className?: string;
  enter?: boolean;
  leave?: boolean;
  exited?: boolean;
  disableOverflow?: boolean;
}

/**
 * @remarks \@since 6.0.0
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
