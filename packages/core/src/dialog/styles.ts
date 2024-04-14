import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-dialog");

export type DialogType = "full-page" | "centered" | "custom";

/** @since 6.0.0 */
export interface DialogClassNameOptions {
  className?: string;

  /**
   * @defaultValue `"centered"`
   */
  type?: DialogType;

  /**
   * @defaultValue `false`
   */
  fixed?: boolean;

  /**
   * @defaultValue `type === "full-page"`
   */
  outline?: boolean;
}

/** @since 6.0.0 */
export function dialog(options: DialogClassNameOptions = {}): string {
  const {
    type = "centered",
    fixed = false,
    outline = type === "full-page",
    className,
  } = options;

  return cnb(
    styles({
      fixed,
      outline,
      centered: type === "centered",
      "full-page": type === "full-page",
    }),
    className
  );
}

/** @since 6.0.0 */
export interface DialogHeaderClassNameOptions {
  className?: string;
}

/** @since 6.0.0 */
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
