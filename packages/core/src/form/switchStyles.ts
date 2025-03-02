import { cnb } from "cnbuilder";

import { bem } from "../utils/bem.js";

const styles = bem("rmd-switch");

/**
 * @since 6.0.0
 */
export interface SwitchClassNameOptions {
  className?: string;
  clickable?: boolean;
  currentColor?: boolean;
}

/**
 * NOTE: This has to be `switchStyles` do to `switch` being a reserved keyword
 *
 * @since 6.0.0
 */
export function switchStyles(options: SwitchClassNameOptions = {}): string {
  const { className, clickable, currentColor } = options;

  return cnb(styles({ "current-color": currentColor, clickable }), className);
}

/**
 * @since 6.0.0
 */
export interface SwitchTrackClassNameOptions {
  className?: string;
  disabled?: boolean;
}

/**
 * @since 6.0.0
 */
export function switchTrack(options: SwitchTrackClassNameOptions = {}): string {
  const { disabled, className } = options;

  return cnb(styles("track", { disabled }), className);
}

/**
 * @since 6.0.0
 */
export interface SwitchBallClassNameOptions {
  className?: string;
  active?: boolean;
}

/**
 * @since 6.0.0
 */
export function switchBall(options: SwitchBallClassNameOptions = {}): string {
  const { active, className } = options;

  return cnb(styles("ball", { active }), className);
}
