import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const styles = bem("rmd-icon-rotator");

/** @remarks \@since 6.0.0 */
export interface IconRotatorClassNameOptions {
  className?: string;

  /**
   * Boolean if the icon is currently rotated.
   */
  rotated: boolean;

  /**
   * Boolean if changing the {@link rotated} state should no longer transition.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 *
 * @remarks \@since 6.0.0
 */
export function getIconRotatorClassName(
  options: IconRotatorClassNameOptions
): string {
  const { className, rotated, disableTransition = false } = options;

  return cnb(
    styles({
      animate: !disableTransition,
      rotated,
    }),
    className
  );
}
