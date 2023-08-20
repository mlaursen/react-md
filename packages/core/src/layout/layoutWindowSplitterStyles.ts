import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-layout-splitter");

/**
 * @remarks \@since 6.0.0
 */
export interface LayoutWindowSplitterClassNameOptions {
  className?: string;

  /**
   * Set this to `true` if the window splitter should stop below the fixed app
   * bar.
   *
   * @defaultValue `false`
   */
  appBarOffset?: boolean;

  /**
   * Set this to `true` if the window splitter should no longer automatically be
   * hidden on for any viewport below the `$layout-navigation-breakpoint`
   * (default phone).
   *
   * @defaultValue `false`
   */
  disableResponsive?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function layoutWindowSplitter(
  options: LayoutWindowSplitterClassNameOptions = {}
): string {
  const { className, appBarOffset, disableResponsive } = options;

  return cnb(
    styles({
      "offset-v": appBarOffset,
      responsive: !disableResponsive,
    }),
    className
  );
}
