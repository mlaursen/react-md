import { cnb } from "cnbuilder";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type FormMessageClassNameOptions } from "./types.js";

const styles = bem("rmd-form-message");

/**
 * @since 6.0.0
 */
export function formMessage(options: FormMessageClassNameOptions = {}): string {
  const { className, error = false, theme = "none" } = options;

  return cnb(
    styles({ [theme]: theme !== "none" }),
    cssUtils({ textColor: error ? "error" : "text-secondary" }),
    className
  );
}

/** @since 6.0.0 */
export interface FormMessageTextClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function formMessageText(
  options: FormMessageTextClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("message"), className);
}

/** @since 6.0.0 */
export interface FormMessageCounterClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function formMessageCounter(
  options: FormMessageCounterClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("counter"), className);
}
