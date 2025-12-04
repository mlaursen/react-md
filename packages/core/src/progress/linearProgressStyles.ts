import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type ProgressTheme } from "./types.js";

const styles = bem("rmd-linear-progress");

declare module "react" {
  interface CSSProperties {
    "--rmd-progress-background-color"?: string;
    "--rmd-progress-color"?: string;
    "--rmd-progress-linear-size"?: string | number;
  }
}

export interface BaseLinearProgressClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"primary"`
   * @since 6.0.0
   */
  theme?: ProgressTheme;

  /**
   * Boolean if the progress should be vertical instead of horizontal.  When
   * this prop is set, you should also set the `verticalHeight` prop to a height
   * value you want for your progress bar.
   *
   * @defaultValue `false`
   */
  vertical?: boolean;
}

/**
 * @since 6.2.0
 */
export interface LinearProgressClassNameOptions extends BaseLinearProgressClassNameOptions {
  /** @defaultValue `false` */
  indeterminate?: boolean;
}

/**
 * @since 6.2.0
 */
export function linearProgress(
  options: LinearProgressClassNameOptions = {}
): string {
  const { className, theme = "primary", vertical, indeterminate } = options;

  return cnb(
    styles({
      vertical,
      horizontal: !vertical,
      determinate: !indeterminate,
      indeterminate,
    }),
    theme !== "current-color" && cssUtils({ textColor: theme }),
    className
  );
}

/**
 * @since 6.2.0
 */
export interface LinearProgressBarClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  reverse?: boolean;
  /** @defaultValue `false` */
  vertical?: boolean;
  /** @defaultValue `false` */
  indeterminate?: boolean;
  /** @defaultValue `false` */
  disableTransition?: boolean;
}

/**
 * @since 6.2.0
 */
export function linearProgressBar(
  options: LinearProgressBarClassNameOptions = {}
): string {
  const { className, reverse, vertical, indeterminate, disableTransition } =
    options;

  return cnb(
    styles("bar", {
      vertical,
      "vertical-reverse": vertical && reverse,
      horizontal: !vertical,
      "horizontal-reverse": !vertical && reverse,
      animate: !disableTransition && !indeterminate,
      determinate: !indeterminate,
      indeterminate,
      "determinate-reverse": !indeterminate && reverse && !vertical,
      "determinate-vertical-reverse": !indeterminate && reverse && vertical,
      "indeterminate-reverse": indeterminate && reverse && !vertical,
      "indeterminate-vertical": indeterminate && vertical,
      "indeterminate-vertical-reverse": indeterminate && reverse && vertical,
    }),
    className
  );
}
