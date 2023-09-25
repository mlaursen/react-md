import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-password");

/**
 * @remarks \@since 6.0.0
 */
export interface PasswordClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function password(options: PasswordClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles(), className);
}

/**
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
