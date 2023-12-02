import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tab-indicator");

/**
 * @remarks \@since 6.0.0
 */
export interface TabIndicatorClassNameOptions {
  className?: string;
  animate?: boolean;
  tablist?: boolean;
  vertical?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tabIndicator(
  options: TabIndicatorClassNameOptions = {}
): string {
  const { className, vertical, tablist, animate } = options;

  return cnb(
    styles({
      animate,
      h: !vertical,
      v: vertical,
      "tablist-h": tablist && !vertical,
      "tablist-v": tablist && vertical,
    }),
    className
  );
}
