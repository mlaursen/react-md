import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-expansion-panel");

/** @since 6.0.0 */
export interface ExpansionPanelClassNameOptions {
  className?: string;

  /**
   * @defaultValue `false`
   */
  expanded?: boolean;

  /**
   * Set this to `true` to disable the `margin-top` transition between multiple
   * panels
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 * @since 6.0.0
 */
export function expansionPanel(
  options: ExpansionPanelClassNameOptions = {}
): string {
  const { className, expanded = false, disableTransition = false } = options;

  return cnb(styles({ expanded, animate: !disableTransition }), className);
}
