import { cnb } from "cnbuilder";
import { cssUtils, type ThemeColor } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

const styles = bem("rmd-avatar");

/** @remarks \@since 6.0.0 */
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
  color?: string;

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
 * @remarks \@since 6.0.0
 */
export function avatar(options: AvatarClassNameOptions): string {
  const { className, color = "", size, theme } = options;

  return cnb(
    styles({ [color]: color, icon: size === "icon" }),
    cssUtils({ backgroundColor: theme }),
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface AvatarImageClassNameOptions {
  className?: string;
}

/**
 * @remarks \@since 6.0.0
 */
export function avatarImage(options: AvatarImageClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles("image"), className);
}
