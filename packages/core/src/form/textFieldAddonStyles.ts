import { cnb } from "cnbuilder";

import { box } from "../box/styles.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-text-field-addon");

/** @since 6.0.0 */
export interface TextFieldAddonClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  after?: boolean;

  /**
   *
   * @defaultValue `true`
   */
  presentational?: boolean;
}

/**
 * @since 6.0.0
 */
export function textFieldAddon(
  options: TextFieldAddonClassNameOptions = {}
): string {
  const { className, after, presentational } = options;

  return cnb(
    styles({
      before: !after,
      after,
      presentational,
    }),
    box({ disablePadding: true }),
    className
  );
}
