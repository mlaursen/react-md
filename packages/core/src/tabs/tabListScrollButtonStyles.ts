import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tablist-button");

/**
 * @since 6.0.0
 */
export interface TabListScrollButtonContainerClassNameOptions {
  className?: string;
  forward: boolean;
}

/**
 * @since 6.0.0
 */
export function tabListScrollButtonContainer(
  options: TabListScrollButtonContainerClassNameOptions
): string {
  const { forward, className } = options;

  return cnb(
    styles({
      left: !forward,
      right: forward,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface TabListScrollButtonClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function tabListScrollButton(
  options: TabListScrollButtonClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("button"), className);
}
