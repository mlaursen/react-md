import { cnb } from "cnbuilder";

import { type ThemeColor, cssUtils } from "../cssUtils.js";
import { type OverridableStringUnion } from "../types.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-avatar-background-color"?: string;
    "--rmd-avatar-color"?: string;
    "--rmd-avatar-border-color"?: string;
    "--rmd-avatar-border-radius"?: string | number;
    "--rmd-avatar-size"?: string | number;
    "--rmd-avatar-font-size"?: string | number;
  }
}

const styles = bem("rmd-avatar");

/**
 * @since 6.2.0
 */
export interface AvatarColorOverrides {}

/**
 * @since 6.2.0
 */
export type DefaultAvatarColors =
  | "red"
  | "pink"
  | "purple"
  | "deep-purple"
  | "indigo"
  | "blue"
  | "light-blue"
  | "cyan"
  | "teal"
  | "green"
  | "light-green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deep-orange"
  | "brown"
  | "grey"
  | "blue-grey";

/**
 * The avatar available colors can be configured using module augmentation:
 *
 * ```ts
 * declare module "@react-md/core/avatar/styles" {
 *   interface AvatarColorOverrides {
 *     "light-blue": false;
 *     brandColor: true;
 *   }
 * }
 * ```
 *
 * This would remove the support for the `light-blue` color and enable
 * `brandColor`.
 *
 * @since 6.2.0
 */
export type AvatarColor = OverridableStringUnion<
  DefaultAvatarColors,
  AvatarColorOverrides
>;

/** @since 6.0.0 */
export interface AvatarClassNameOptions {
  className?: string;

  /**
   * An optional color to apply to the avatar. This will apply a className of
   * `rmd-avatar--${color}`, so only the keys from the `$rmd-avatar-colors` Map
   * are supported by default. It is recommended to create custom colors using
   * the `rmd-avatar-theme-update-var` mixin with custom class names if the
   * default colors aren't extensive enough.
   *
   * @see {@link theme}
   * @defaultValue `""`
   */
  color?: AvatarColor;

  /**
   * @defaultValue `"avatar"`
   */
  size?: "avatar" | "icon";

  /**
   * This can be used instead of {@link color} to set the background color to one of
   * the theme colors. This will also set the text color to either be `#000` or
   * `#fff` automatically to enforce the correct aspect ratio.
   */
  theme?: ThemeColor;
}

/**
 * @since 6.0.0
 */
export function avatar(options: AvatarClassNameOptions): string {
  const { className, color = "", size, theme } = options;

  return cnb(
    styles({ [color]: color, icon: size === "icon" }),
    cssUtils({ backgroundColor: theme }),
    className
  );
}

/** @since 6.0.0 */
export interface AvatarImageClassNameOptions {
  className?: string;
}

/**
 * @since 6.0.0
 */
export function avatarImage(options: AvatarImageClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles("image"), className);
}
