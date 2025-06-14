import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-form-message-container");

/**
 * @since 6.0.0
 */
export interface FormMessageContainerClassNameOptions {
  className?: string;

  /**
   * Set to `true` to enable `display: inline-flex; width: auto`.
   *
   * @defaultValue `false`
   * @since 6.3.0
   */
  inline?: boolean;
}

/**
 * @since 6.0.0
 */
export function formMessageContainer(
  options: FormMessageContainerClassNameOptions = {}
): string {
  const { className, inline } = options;

  return cnb(styles({ inline }), className);
}
