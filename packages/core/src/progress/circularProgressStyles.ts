import { cnb } from "cnbuilder";

import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type ProgressTheme } from "./types.js";

const styles = bem("rmd-circular-progress");

/**
 * @since 6.2.0
 */
export interface CircularProgressClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"primary"`
   * @since 6.0.0
   */
  theme?: ProgressTheme;

  /**
   * Set to `true` to render as a smaller size.
   *
   * @defaultValue `false`
   * @since 2.3.0
   * @since 6.0.0 Renamed from `small`
   */
  dense?: boolean;

  /**
   * Boolean if the circular progress should be centered using left and right
   * margins.
   *
   * @defaultValue `false`
   * @since 6.0.0 Renamed from `centered`
   */
  disableCentered?: boolean;
}

/**
 * @since 6.2.0
 */
export function circularProgress(
  options: CircularProgressClassNameOptions = {}
): string {
  const { className, theme = "primary", dense, disableCentered } = options;

  return cnb(
    styles({ dense, centered: !disableCentered }),
    theme !== "current-color" && cssUtils({ textColor: theme }),
    className
  );
}

/**
 * @since 6.2.0
 */
export interface CircularProgressSvgClassNameOptions {
  className?: string;
  /** @defaultValue `false` */
  indeterminate?: boolean;
  /** @defaultValue `false` */
  disableShrink?: boolean;
}

/**
 * @since 6.2.0
 */
export function circularProgressSvg(
  options: CircularProgressSvgClassNameOptions = {}
): string {
  const { className, indeterminate, disableShrink } = options;

  return cnb(
    styles("svg", {
      determinate: !indeterminate,
      indeterminate: indeterminate && !disableShrink,
      "rotate-only": indeterminate && disableShrink,
    }),
    className
  );
}
/**
 * @since 6.2.0
 */
export interface CircularProgressCircleClassNameOptions {
  className?: string;
  /** @defaultValue `false` */
  indeterminate?: boolean;
  /** @defaultValue `false` */
  disableShrink?: boolean;
  /** @defaultValue `false` */
  disableTransition?: boolean;
}

/**
 * @since 6.2.0
 */
export function circularProgressCircle(
  options: CircularProgressCircleClassNameOptions = {}
): string {
  const { className, indeterminate, disableShrink, disableTransition } =
    options;

  return cnb(
    styles("circle", {
      animate: !disableTransition && !indeterminate,
      determinate: !indeterminate,
      indeterminate: indeterminate && !disableShrink,
      "rotate-only": indeterminate && disableShrink,
    }),
    className
  );
}
