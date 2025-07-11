import { cnb } from "cnbuilder";

import {
  type CSSTransitionClassNames,
  type TransitionTimeout,
} from "../transition/types.js";
import { bem } from "../utils/bem.js";
import { DISPLAY_NONE_CLASS } from "../utils/isElementVisible.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-dialog-min-width"?: string | number;
    "--rmd-dialog-horizontal-margin"?: string | number;
    "--rmd-dialog-vertical-margin"?: string | number;
    "--rmd-dialog-z-index"?: string | number;
    "--rmd-dialog-header-padding"?: string | number;
    "--rmd-dialog-header-padding-bottom"?: string | number;
    "--rmd-dialog-content-padding"?: string | number;
    "--rmd-dialog-footer-padding"?: string | number;
    "--rmd-dialog-width"?: string | number;
    "--rmd-dialog-small-width"?: string | number;
    "--rmd-dialog-medium-width"?: string | number;
    "--rmd-dialog-large-width"?: string | number;
    "--rmd-dialog-extra-large-width"?: string | number;
  }
}

const styles = bem("rmd-dialog");
const containerStyles = bem("rmd-dialog-container");

export type DialogType = "full-page" | "centered" | "custom";

/**
 * This can be used to enforce a specific width for dialogs instead of relying
 * on the size of the content to determine the width. The width will also ensure
 * that it does not overflow based on the viewport width and margins applied.
 *
 * For example: if the `width="extra-large"` and the total viewport size is
 * `600px`, the dialog width would be `420px` since there is a default `80px`
 * margin to the left and right of the dialog. If the user expands the browser,
 * the dialog width will continue to grow until it reaches the `extra-large`
 * width and stop growing from that point.
 *
 * @since 6.0.0
 */
export type DialogWidth = "auto" | "small" | "medium" | "large" | "extra-large";

/**
 * @since 6.0.0
 */
export interface DialogContainerClassNameOptions {
  className?: string;

  centered?: boolean;
  displayNone?: boolean;
}

/**
 * @since 6.0.0
 */
export function dialogContainer(
  options: DialogContainerClassNameOptions = {}
): string {
  const { className, centered, displayNone } = options;

  return cnb(
    containerStyles({ centered }),
    displayNone && DISPLAY_NONE_CLASS,
    className
  );
}

/** @since 6.0.0 */
export interface DialogClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"centered"`
   */
  type?: DialogType;

  /**
   * @defaultValue `"auto"`
   */
  width?: DialogWidth;

  /**
   * @defaultValue `false`
   */
  fixed?: boolean;

  /**
   * @defaultValue `type === "full-page"`
   */
  outline?: boolean;

  /**
   * This is mostly used for handling nested dialogs and removes any box shadow
   * on a dialog that has a child visible.
   *
   * @defaultValue `false`
   */
  disableBoxShadow?: boolean;
}

/** @since 6.0.0 */
export function dialog(options: DialogClassNameOptions = {}): string {
  const {
    type = "centered",
    width,
    fixed = false,
    outline = type === "full-page",
    disableBoxShadow,
    className,
  } = options;

  return cnb(
    styles({
      fixed,
      outline,
      centered: type === "centered",
      "full-page": type === "full-page",
      "no-box-shadow": type === "centered" && disableBoxShadow,
      "s-width": width === "small",
      "m-width": width === "medium",
      "l-width": width === "large",
      "xl-width": width === "extra-large",
    }),
    className
  );
}

/** @since 6.0.0 */
export interface DialogHeaderClassNameOptions {
  className?: string;
}

/**
 * NOTE: The default `DialogHeader` component uses the `Box` component so the
 * `box` class name utility function or `Box` component will probably be
 * required if using this util
 *
 * @since 6.0.0
 */
export function dialogHeader(
  options: DialogHeaderClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("header"), className);
}

/** @since 6.0.0 */
export interface DialogContentClassNameOptions {
  className?: string;

  /** @defaultValue `false` */
  disablePadding?: boolean;
}

/** @since 6.0.0 */
export function dialogContent(
  options: DialogContentClassNameOptions = {}
): string {
  const { className, disablePadding = false } = options;

  return cnb(styles("content", { padded: !disablePadding }), className);
}

/**
 * An optional alignment for the content within the footer. Since the majority
 * of dialog footers are used to contain action buttons, the default alignment
 * is near the end.
 *
 * @since 3.1.0
 */
export type DialogFooterAlignment =
  | "none"
  | "start"
  | "end"
  | "between"
  | "stacked-start"
  | "stacked-end";

/** @since 6.0.0 */
export interface DialogFooterClassNameOptions {
  className?: string;

  /** @defaultValue `"end"` */
  align?: DialogFooterAlignment;
}

/** @since 6.0.0 */
export function dialogFooter(
  options: DialogFooterClassNameOptions = {}
): string {
  const { align = "end", className } = options;

  return cnb(
    styles("footer", {
      flex: align !== "none",
      "flex-v": align === "stacked-start" || align === "stacked-end",
      start: align === "start" || align === "stacked-start",
      between: align === "between",
      end: align === "end" || align === "stacked-end",
    }),
    className
  );
}

/** @since 4.0.0 */
export const DEFAULT_DIALOG_TIMEOUT = {
  enter: 200,
  exit: 150,
} as const satisfies TransitionTimeout;

/** @since 4.0.0 */
export const DEFAULT_DIALOG_CLASSNAMES = {
  appear: "rmd-dialog--enter",
  appearActive: "rmd-dialog--enter-active",
  enter: "rmd-dialog--enter",
  enterActive: "rmd-dialog--enter-active",
  exit: "rmd-dialog--exit",
  exitActive: "rmd-dialog--exit-active",
} as const satisfies CSSTransitionClassNames;
