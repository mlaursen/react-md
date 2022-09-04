import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { FormMessageClassNameOptions } from "./types";

const styles = bem("rmd-form-message");

/**
 * @remarks \@since 6.0.0
 */
export function formMessage(options: FormMessageClassNameOptions = {}): string {
  const { className, error = false, theme = "none" } = options;

  return cnb(
    styles({
      error,
      [theme]: theme !== "none",
    }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface FormMessageTextClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function formMessageText(
  options: FormMessageTextClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("message"), className);
}

/** @remarks \@since 6.0.0 */
export interface FormMessageCounterClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function formMessageCounter(
  options: FormMessageCounterClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("counter"), className);
}
