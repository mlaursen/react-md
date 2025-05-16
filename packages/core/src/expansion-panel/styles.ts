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

/**
 * @since 6.0.0
 */
export interface ExpansionPanelHeadingClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function expansionPanelHeading(
  options: ExpansionPanelHeadingClassNameOptions = {}
): string {
  const { className } = options;
  return cnb(styles("heading"), className);
}
/**
 * @since 6.0.0
 */
export interface ExpansionPanelButtonClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function expansionPanelButton(
  options: ExpansionPanelButtonClassNameOptions = {}
): string {
  const { className } = options;
  return cnb(styles("button"), className);
}
