import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-menu-item-input-toggle");

/** @since 6.0.0 */
export interface MenuItemInputToggleClassNameOptions {
  className?: string;
  type: "radio" | "checkbox" | "switch";
}

/**
 * @since 6.0.0
 */
export function menuItemInputToggle(
  options: MenuItemInputToggleClassNameOptions
): string {
  const { className, type } = options;
  return cnb(
    `rmd-${type}-menu-item`,
    styles({ switch: type === "switch" }),
    className
  );
}

/**
 * @since 6.0.0
 */
export interface MenuItemInputToggleTrackClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function menuItemInputToggleTrack(
  options: MenuItemInputToggleTrackClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("track"), className);
}

/**
 * @since 6.0.0
 */
export interface MenuItemInputToggleBallClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function menuItemInputToggleBall(
  options: MenuItemInputToggleBallClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("ball"), className);
}

/**
 * @since 6.0.0
 */
export interface MenuItemInputToggleIconClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function menuItemInputToggleIcon(
  options: MenuItemInputToggleIconClassNameOptions = {}
): string {
  const { className } = options;

  return cnb(styles("icon"), className);
}
