import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { FormMessageClassNameOptions } from "./types";

const styles = bem("rmd-form-message");

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
