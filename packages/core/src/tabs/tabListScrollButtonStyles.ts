import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tablist-button");

/**
 * @since 6.0.0
 */
export interface TabListScrollButtonContainerClassNameOptions {
  className?: string;
  forward: boolean;
  vertical?: boolean;
}

/**
 * @since 6.0.0
 */
export function tabListScrollButtonContainer(
  options: TabListScrollButtonContainerClassNameOptions
): string {
  const { forward, vertical, className } = options;

  return cnb(
    styles({
      left: !vertical && !forward,
      right: !vertical && forward,
      above: vertical && !forward,
      below: vertical && forward,
    }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface TabListScrollButtonClassNameOptions {
  className?: string;
  vertical?: boolean;
}

/**
 * @since 6.0.0
 */
export function tabListScrollButton(
  options: TabListScrollButtonClassNameOptions = {}
): string {
  const { className, vertical } = options;

  return cnb(styles("button", { v: vertical }), className);
}
