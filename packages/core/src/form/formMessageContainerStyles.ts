import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-form-message-container");

/**
 * @since 6.0.0
 */
export interface FormMessageContainerClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function formMessageContainer(
  options: FormMessageContainerClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles(), className);
}
