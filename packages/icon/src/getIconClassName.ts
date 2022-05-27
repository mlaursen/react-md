import { bem } from "@react-md/core";
import { cnb } from "cnbuilder";

const styles = bem("rmd-icon");

/** @remarks \@since 6.0.0 */
export interface SVGIconClassNameOptions {
  className?: string;

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
export function getIconClassName(options: IconClassNameOptions): string {
  const {
    className,
    type,
    dense = false,
    forceSize = false,
    forceFontSize = false,
    iconClassName = type === "font" ? "material-icons" : undefined,
  } = options as FontIconClassNameOptions &
    SVGIconClassNameOptions & { type: "font" | "svg" };

  return cnb(
    styles({
      [type]: true,
      dense,
      "forced-font": forceFontSize,
      "forced-size": forceSize,
    }),
    iconClassName,
    className
  );
}
