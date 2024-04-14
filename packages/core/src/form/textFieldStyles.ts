import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-text-field");

/** @since 6.0.0 */
export interface TextFieldClassNameOptions {
  className?: string;

  /**
   * Set this value to `true` when a text field has a floating label the text
   * field is not focused or valued so that the placeholder is hidden by setting
   * the opacity to 0. This makes it so the placeholder and label to not cover
   * each other.
   *
   * @defaultValue `false`
   */
  placeholderHidden?: boolean;
}

/**
 * @since 6.0.0
 */
export function textField(options: TextFieldClassNameOptions = {}): string {
  const { className, placeholderHidden = false } = options;

  return cnb(
    styles({
      "placeholder-hidden": placeholderHidden,
    }),
    className
  );
}
