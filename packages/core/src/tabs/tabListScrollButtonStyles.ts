import { cnb } from "cnbuilder";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-tablist-button");

/**
 * @remarks \@since 6.0.0
 */
export interface TabListScrollButtonContainerClassNameOptions {
  className?: string;
  forward: boolean;
}

/**
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
 */
export interface TabListScrollButtonClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function tabListScrollButton(
  options: TabListScrollButtonClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("button"), className);
}
