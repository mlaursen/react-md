import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const styles = bem("rmd-avatar");

export interface AvatarClassNameOptions {
  className?: string;

  /**
   * An optional color to apply to the avatar. This will apply a className of
   * `rmd-avatar--${color}`, so only the keys from the `$rmd-avatar-colors` Map
   * are supported by default. It is recommended to create custom colors using
   * the `rmd-avatar-theme-update-var` mixin with custom class names if the
   * default colors aren't extensive enough.
   *
   * @defaultValue `""`
   */
  color?: string;
}

export function avatar(options: AvatarClassNameOptions): string {
  const { className, color = "" } = options;

  return cnb(styles({ [color]: color }), className);
}

export interface AvatarImageClassNameOptions {
  className?: string;
}

export function avatarImage(options: AvatarImageClassNameOptions = {}): string {
  const { className } = options;

  return cnb(styles("image"), className);
}
