import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-password");

/**
 * @since 6.0.0
 */
export interface PasswordClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function password(options: PasswordClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles(), className);
}

/**
 * @since 6.0.0
 */
export interface PasswordInputClassNameOptions {
  className?: string;
}

export function passwordInput(
  options: PasswordInputClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("input"), className);
}

/**
 * @since 6.0.0
 */
export interface PasswordInputToggleClassNameOptions {
  className?: string;
}

export function passwordInputToggle(
  options: PasswordInputToggleClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("toggle"), className);
}
