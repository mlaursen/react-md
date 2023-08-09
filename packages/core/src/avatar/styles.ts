import { cnb } from "cnbuilder";
import { bem } from "../utils/bem";

const styles = bem("rmd-avatar");

/** @remarks \@since 6.0.0 */
export interface AvatarClassNameOptions {
  className?: string;

  /** @defaultValue `""` */
  color?: string;

  /** @defaultValue `"avatar"` */
  size?: "avatar" | "icon";
}

/**
 * @remarks \@since 6.0.0
 */
export function avatar(options: AvatarClassNameOptions): string {
  const { className, color = "", size } = options;

  return cnb(styles({ [color]: color, icon: size === "icon" }), className);
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
