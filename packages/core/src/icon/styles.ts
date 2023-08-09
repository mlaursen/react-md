import { cnb } from "cnbuilder";
import type { ThemeOrTextColor } from "../theme/types";
import { bem } from "../utils/bem";
import type { MaterialIconFamily, MaterialSymbolFamily } from "./material";

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
   * - `text-primary -> $text-primary-color`
   * - `text-secondary -> $text-primary-color`
   * - `text-hint -> $text-hint-color`
   * - `text-disabled -> $text-disabled-color`
   */
  color?: ThemeOrTextColor;

  /**
   * Boolean if the font icon should use the dense spec.
   *
   * @defaultValue `false`
   */
  dense?: boolean;

  /**
   * Set this to `true` if the icon should display inline with other text (like
   * a paragraph) by applying `vertical-align: bottom`.
   *
   * @example
   * ```tsx
   * <Typography>
   *   <InfoIcon inline className="rmd-icon--before" />
   *   Some additional information around xyz.
   * </Typography>
   * ```
   *
   * @defaultValue `false`
   */
  inline?: boolean;
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
export interface MaterialIconClassNameOptions extends SVGIconClassNameOptions {
  family: MaterialIconFamily;
}

/** @remarks \@since 6.0.0 */
export interface MaterialSymbolClassNameOptions
  extends SVGIconClassNameOptions {
  family: MaterialSymbolFamily;
}

/** @remarks \@since 6.0.0 */
export type IconClassNameOptions =
  | ({ type: "font" } & FontIconClassNameOptions)
  | ({ type: "svg" } & SVGIconClassNameOptions)
  | ({ type: "material" } & MaterialIconClassNameOptions)
  | ({ type: "symbol" } & MaterialSymbolClassNameOptions);

/**
 *
 * @remarks \@since 6.0.0
 */
export function icon(options: IconClassNameOptions): string {
  const {
    className,
    type,
    color = "",
    family = "",
    dense = false,
    inline = false,
    forceSize = false,
    forceFontSize = false,
    iconClassName,
  } = options as FontIconClassNameOptions &
    SVGIconClassNameOptions & {
      type: "font" | "svg" | "symbol" | "material";
      family?: MaterialIconFamily;
    };

  const isFont = type === "font";
  const isSvg = type === "svg";
  const isSymbol = type === "symbol";
  const isMaterial = type === "material";

  return cnb(
    styles({
      [color]: !!color,
      svg: isSvg,
      font: isFont || isMaterial,
      symbol: isSymbol,
      vab: inline,
      dense,
      "forced-font": forceFontSize,
      "forced-size": forceSize,
    }),
    isSymbol && `material-symbols-${family}`,
    isMaterial &&
      `material-icons${
        family === "filled" ? "" : `-${family === "rounded" ? "round" : family}`
      }`,
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
