import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-snackbar");

/**
 * @remarks
 * \@since 2.0.0
 * \@since 6.0.0 Added the `"top-left"`, `"top-right"`, `"bottom-left"`, and
 * `"bottom-right"` positions
 */
export type SnackbarPosition =
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "top-left"
  | "top-right";

/** @remarks \@since 6.0.0 */
export interface SnackbarClassNameOptions {
  className?: string;
  position: SnackbarPosition;
}

/**
 * @remarks \@since 6.0.0
 */
export function snackbar(options: SnackbarClassNameOptions): string {
  const { className, position } = options;
  const top =
    position === "top" || position === "top-left" || position === "top-right";

  return cnb(
    styles({
      top,
      bottom: !top,
      start: position === "top-left" || position === "bottom-left",
      end: position === "top-right" || position === "bottom-right",
    }),
    className
  );
}
