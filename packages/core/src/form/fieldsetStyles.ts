import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-fieldset");

/** @since 6.0.0 */
export interface FieldsetClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  fullWidth?: boolean;

  /**
   * Set this to `true` to enable the default browser styles for a fieldset.
   *
   * @since 6.0.0 This was renamed from `unstyled`.
   * @defaultValue `false`
   */
  browserStyles?: boolean;

  /**
   * @since 6.4.0
   * @defaultValue `false`
   */
  floatingLegend?: boolean;
}

/**
 * @since 6.0.0
 */
export function fieldset(options: FieldsetClassNameOptions = {}): string {
  const {
    className,
    fullWidth,
    browserStyles = false,
    floatingLegend,
  } = options;

  return cnb(
    styles({
      unstyled: !browserStyles,
      "full-width": fullWidth,
      "floating-legend": floatingLegend,
    }),
    className
  );
}
