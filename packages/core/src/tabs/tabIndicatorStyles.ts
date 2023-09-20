import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tab-indicator");

/**
 * @remarks \@since 6.0.0
 */
export interface TabIndicatorClassNameOptions {
  className?: string;
  tablist?: boolean;
  animate?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tabIndicator(
  options: TabIndicatorClassNameOptions = {}
): string {
  const { className, tablist, animate } = options;

  return cnb(styles({ tablist, animate }), className);
}
