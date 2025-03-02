import { cnb } from "cnbuilder";

import { type TextColor, type ThemeColor, cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type LabelClassNameOptions } from "./types.js";

const styles = bem("rmd-label");

/**
 * @since 6.0.0
 */
export function label(options: LabelClassNameOptions): string {
  const {
    className,
    gap,
    error,
    dense,
    active,
    stacked,
    reversed,
    disabled,
    floating,
    inactive,
    floatingActive = active,
  } = options;

  let textColor: TextColor | ThemeColor | undefined;
  if (disabled) {
    textColor = "text-disabled";
  } else if (error) {
    textColor = "error";
  } else if (floating && inactive) {
    textColor = "text-secondary";
  }

  return cnb(
    styles({
      gap,
      error,
      dense,
      active,
      disabled,
      floating,
      stacked: stacked && !reversed,
      reversed: !stacked && reversed,
      "stacked-reversed": stacked && reversed,
      "floating-dense": floating && dense,
      "floating-active": floating && floatingActive,
    }),
    cssUtils({
      textColor,
    }),
    className
  );
}
