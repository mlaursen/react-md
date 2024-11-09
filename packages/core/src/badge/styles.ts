import { cnb } from "cnbuilder";
import { type BackgroundColor, cssUtils } from "../cssUtils.js";
import { bem } from "../utils/bem.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-badge-size"?: string | number;
    "--rmd-badge-offset"?: string | number;
    "--rmd-badge-offset-top"?: string | number;
    "--rmd-badge-offset-right"?: string | number;
  }
}

const styles = bem("rmd-badge");

/**
 * @since 6.0.0 Renamed `"default"` to `"greyscale"` and added all
 * theme colors.
 */
export type BadgeTheme = BackgroundColor | "greyscale" | "clear";

/**
 * @since 6.0.0
 */
export interface BadgeClassNameOptions {
  className?: string;

  /** @defaultValue `""greyscale` */
  theme?: BadgeTheme;
}

/**
 * @since 6.0.0
 */
export function badge(options: BadgeClassNameOptions = {}): string {
  const { className, theme = "greyscale" } = options;
  const greyscale = theme === "greyscale";
  const clear = theme === "clear";

  return cnb(
    styles({ greyscale }),
    cssUtils({ backgroundColor: !clear && !greyscale ? theme : undefined }),
    className
  );
}
