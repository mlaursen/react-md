import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-layout-main");

/**
 * @since 6.0.0
 */
export interface MainClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to apply `margin-left` equal to the current navigation
   * width. If you want this value to animate, use the `useMainClassName` hook
   * instead.
   *
   * @defaultValue `false`
   */
  navOffset?: boolean;

  /**
   * Set this to `true` to apply `padding-top` equal to the height of the main
   * app bar so that content is not covered.
   *
   * @see {@link useLayoutAppBarHeight}
   * @defaultValue `false`
   */
  appBarOffset?: boolean;
}

/**
 * @since 6.0.0
 */
export function main(options: MainClassNameOptions = {}): string {
  const { navOffset, appBarOffset, className } = options;

  return cnb(
    styles({
      "offset-v": appBarOffset,
    }),
    navOffset && "rmd-layout-h--active",
    className
  );
}
