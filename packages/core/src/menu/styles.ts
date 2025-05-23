import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-menu");
const menuItemInputToggleStyles = bem("rmd-menu-item-input-toggle");

/**
 * @since 6.0.0
 */
export interface MenuClassNameOptions {
  className?: string;
  horizontal?: boolean;
  elevated?: boolean;
}

/**
 * @since 6.0.0
 */
export function menu(options: MenuClassNameOptions = {}): string {
  const { className, horizontal, elevated } = options;

  return cnb(styles({ horizontal, elevated }), className);
}

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
    menuItemInputToggleStyles({ switch: type === "switch" }),
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

  return cnb(menuItemInputToggleStyles("track"), className);
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

  return cnb(menuItemInputToggleStyles("ball"), className);
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

  return cnb(menuItemInputToggleStyles("icon"), className);
}
