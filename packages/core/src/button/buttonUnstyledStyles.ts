import { cnb } from "cnbuilder";

/** @remarks \@since 6.0.0 */
export interface ButtonUnstyledClassNameOptions {
  className?: string;
}

/**
 * This requires the `$disable-unstyled-utility-class` to be `false` to use.
 *
 * @remarks \@since 6.0.0
 */
export function buttonUnstyled(
  options: ButtonUnstyledClassNameOptions = {}
): string {
  const { className } = options;

  return cnb("rmd-button-unstyled", className);
}
