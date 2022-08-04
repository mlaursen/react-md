import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { FormTheme } from "./types";

const styles = bem("rmd-form-message");

export interface FormMessageClassNameOptions {
  className?: string;

  /**
   * Boolean if the message should gain the error state which changes the text
   * color to `red` by default.
   *
   * @defaultValue `false`
   */
  error?: boolean;

  /**
   * The current theme for the related text field. This is really only used to
   * match the current horizontal padding of the text field.
   *
   * @defaultValue `"outline"`
   */
  theme?: FormTheme;
}

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

export interface FormMessageTextClassNameOptions {
  className?: string;
}

export function formMessageText(
  options: FormMessageTextClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("message"), className);
}

export interface FormMessageCounterClassNameOptions {
  className?: string;
}

export function formMessageCounter(
  options: FormMessageCounterClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("counter"), className);
}
