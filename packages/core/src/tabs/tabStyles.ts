import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { tabIndicator } from "./tabIndicatorStyles.js";

const styles = bem("rmd-tab");

/**
 * @since 6.0.0
 */
export interface TabClassNameOptions {
  className?: string;
  active?: boolean;
  isLink?: boolean;
  activeIndicator?: boolean;
  verticalActiveIndicator?: boolean;
  stacked?: boolean;
  reversed?: boolean;
  disabled?: boolean;
}

/**
 * @since 6.0.0
 */
export function tab(options: TabClassNameOptions = {}): string {
  const {
    className,
    active,
    isLink,
    stacked,
    reversed,
    disabled,
    activeIndicator,
    verticalActiveIndicator,
  } = options;

  return cnb(
    styles({
      active,
      reversed: reversed && !stacked,
      stacked,
      "stacked-reversed": stacked && reversed,
      disabled,
    }),
    active &&
      activeIndicator &&
      tabIndicator({ vertical: verticalActiveIndicator }),
    cssUtils({ surface: true, textDecoration: isLink ? "none" : undefined }),
    className
  );
}
