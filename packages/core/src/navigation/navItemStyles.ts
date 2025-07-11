import { cnb } from "cnbuilder";

import { button } from "../button/styles.js";
import { cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-nav-item");

declare module "react" {
  interface CSSProperties {
    "--rmd-navigation-border-radius"?: string | number;
    "--rmd-navigation-horizontal-padding"?: string | number;
    "--rmd-navigation-padding-incrementor"?: string | number;
  }
}

/**
 * @since 6.0.0
 */
export interface NavItemClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function navItem(options: NavItemClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles(), className);
}

/**
 * @since 6.0.0
 */
export interface NavItemContentClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function navItemContent(
  options: NavItemContentClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("content"), className);
}

/**
 * @since 6.0.0
 */
export interface NavItemLinkClassNameOptions {
  className?: string;
  active?: boolean;

  /** @defaultValue `cssUtils({ fontWeight: "bold" })` */
  activeClassName?: string;
}

/**
 * @since 6.0.0
 */
export function navItemLink(options: NavItemLinkClassNameOptions = {}): string {
  const {
    active,
    activeClassName = cssUtils({ fontWeight: "bold" }),
    className,
  } = options;

  return cnb(
    navItemContent(),
    styles("link", { active }),
    button(),
    cssUtils({ textDecoration: "none" }),
    active && activeClassName,
    className
  );
}
