import { cnb } from "cnbuilder";

/** @since 6.0.0 */
export interface ButtonUnstyledClassNameOptions {
  className?: string;
}

/**
 * This requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @since 6.0.0
 */
export function buttonUnstyled(
  options: ButtonUnstyledClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-button-unstyled", className);
}
