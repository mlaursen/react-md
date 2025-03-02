import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-fieldset");

/** @since 6.0.0 */
export interface FieldsetClassNameOptions {
  className?: string;

  /**
   * Set this to `true` to enable the default browser styles for a fieldset.
   *
   * @since 6.0.0 This was renamed from `unstyled`.
   * @defaultValue `false`
   */
  browserStyles?: boolean;

  /**
   * @defaultValue `false`
   */
  fullWidth?: boolean;
}

/**
 * @since 6.0.0
 */
export function fieldset(options: FieldsetClassNameOptions = {}): string {
  const { className, fullWidth, browserStyles = false } = options;

  return cnb(
    styles({ unstyled: !browserStyles, "full-width": fullWidth }),
    className
  );
}
