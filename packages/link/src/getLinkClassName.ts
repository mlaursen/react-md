import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const styles = bem("rmd-link");

/** @remarks \@since 6.0.0 */
export interface LinkClassNameOptions {
  className?: string;
}

/**
 * This really doesn't do much at this time since it only merges `rmd-link` with
 * the optional className. This was mostly added just for convention purposes.
 *
 * @remarks \@since 6.0.0
 */
export function getLinkClassName(options: LinkClassNameOptions): string {
  const { className } = options;
  return cnb(styles(), className);
}

/** @remarks \@since 6.0.0 */
export interface SKipToMainLinkClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  unstyled?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function getSkipToMainLinkClassName(
  options: SKipToMainLinkClassNameOptions
): string {
  const { unstyled = false, className } = options;

  return cnb(
    styles({
      skip: true,
      "skip-styled": !unstyled,
    }),
    className
  );
}
