import { cnb } from "cnbuilder";
import type { TextThemeColor, ThemeColor } from "../theme";
import { bem } from "../utils";

declare module "react" {
  interface CSSProperties {
    "--rmd-icon-color"?: string;
    "--rmd-icon-size"?: string | number;
    "--rmd-icon-spacing"?: string | number;
    "--rmd-icon-rotate-from"?: string | number;
    "--rmd-icon-rotate-to"?: string | number;
  }
}

const styles = bem("rmd-icon");
const rotatorStyles = bem("rmd-icon-rotator");

/** @remarks \@since 6.0.0 */
export interface SVGIconClassNameOptions {
  className?: string;

  /**
   * An optional theme color to apply to the icon. When this is `undefined`, the
   * default icon color will be used instead.
   *
   * - `primary -> $primary-color`
   * - `secondary -> $secondary-color`
   * - `warning -> $warning-color`
   * - `success -> $success-color`
   * - `error -> $error-color`
   * - `hint -> $text-hint-color`
   * - `disabled -> $text-disabled-color`
   */
  color?: ThemeColor | TextThemeColor;

  /**
   * Boolean if the font icon should use the dense spec.
   *
   * @defaultValue `false`
   */
  dense?: boolean;
}

/** @remarks \@since 6.0.0 */
export interface FontIconClassNameOptions extends SVGIconClassNameOptions {
  /**
   * The font icon class name to use.
   *
   * @defaultValue `"material-icons"`
   */
  iconClassName?: string;

  /**
   * Either a boolean that will enforce the 24x24 size of the font icon or a
   * number of the size to enforce. This is useful when using other font icon
   * libraries that do not have a consistent size.
   *
   * @defaultValue `false`
   */
  forceSize?: boolean;

  /**
   * Boolean if the `forceSize` prop should also force the `font-size` instead
   * of only `width` and `height`.
   *
   * @defaultValue `false`
   */
  forceFontSize?: boolean;
}

/** @remarks \@since 6.0.0 */
export type IconClassNameOptions =
  | ({ type: "font" } & FontIconClassNameOptions)
  | ({ type: "svg" } & SVGIconClassNameOptions);

/**
 *
 * @remarks \@since 6.0.0
 */
export function icon(options: IconClassNameOptions): string {
  const {
    className,
    type,
    color,
    dense = false,
    forceSize = false,
    forceFontSize = false,
    iconClassName = type === "font" ? "material-icons" : undefined,
  } = options as FontIconClassNameOptions &
    SVGIconClassNameOptions & { type: "font" | "svg" };

  return cnb(
    styles({
      [color || ""]: !!color,
      [type]: true,
      dense,
      "forced-font": forceFontSize,
      "forced-size": forceSize,
    }),
    iconClassName,
    className
  );
}

/** @remarks \@since 6.0.0 */
export interface IconRotatorClassNameOptions {
  className?: string;

  /**
   * Boolean if the icon is currently rotated.
   */
  rotated: boolean;

  /**
   * Boolean if changing the {@link rotated} state should no longer transition.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

/**
 *
 * @remarks \@since 6.0.0
 */
export function iconRotator(options: IconRotatorClassNameOptions): string {
  const { className, rotated, disableTransition = false } = options;

  return cnb(
    rotatorStyles({
      animate: !disableTransition,
      rotated,
    }),
    className
  );
}
