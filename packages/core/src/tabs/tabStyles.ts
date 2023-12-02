import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { tabIndicator } from "./tabIndicatorStyles.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-tab-color"?: string;
    "--rmd-tab-active-color"?: string;
    "--rmd-tab-inactive-color"?: string;
    "--rmd-tab-disabled-color"?: string;
  }
}

const styles = bem("rmd-tab");

/**
 * @remarks \@since 6.0.0
 */
export interface TabClassNameOptions {
  className?: string;
  active?: boolean;
  isLink?: boolean;
  activeIndicator?: boolean;
  stacked?: boolean;
  reversed?: boolean;
  disabled?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tab(options: TabClassNameOptions = {}): string {
  const {
    className,
    active,
    isLink,
    activeIndicator,
    stacked,
    reversed,
    disabled,
  } = options;

  return cnb(
    styles({
      active,
      reversed: reversed && !stacked,
      stacked,
      "stacked-reversed": stacked && reversed,
      disabled,
    }),
    active && activeIndicator && tabIndicator(),
    cssUtils({ surface: true, textDecoration: isLink ? "none" : undefined }),
    className
  );
}
