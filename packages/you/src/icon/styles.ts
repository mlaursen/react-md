import { cnb } from "cnbuilder";

import {
  type PaletteTextColorClassNameOptions,
  palette,
} from "../styles/palette.js";
import { type DefaultComponentExtraSize } from "../styles/size.js";
import { type OverridableStringUnion } from "../types.js";
import { bem } from "../utils/bem.js";
import {
  type MaterialIconFamily,
  type MaterialSymbolFamily,
} from "./material.js";

const styles = bem("rmd-icon");

export interface IconSizeOverrides {}
export type DefaultIconSize = DefaultComponentExtraSize;
export type IconSize = OverridableStringUnion<
  DefaultIconSize,
  IconSizeOverrides
>;

export interface BaseIconClassNameOptions extends PaletteTextColorClassNameOptions {
  /**
   * @defaultValue `"medium"`
   */
  size?: IconSize;
}

export interface FontIconClassNameOptions extends BaseIconClassNameOptions {
  type: "font";

  /**
   * The font icon class name to use.
   *
   * @defaultValue `"material-icons"`
   */
  iconClassName?: string;
}

export interface SVGIconClassNameOptions extends BaseIconClassNameOptions {
  type: "svg";
}

/** @since 6.0.0 */
export interface MaterialIconClassNameOptions extends BaseIconClassNameOptions {
  type: "material";
  family: MaterialIconFamily;
}

/** @since 6.0.0 */
export interface MaterialSymbolClassNameOptions extends BaseIconClassNameOptions {
  type: "symbol";
  family: MaterialSymbolFamily;
}

/** @since 6.0.0 */
export type IconClassNameOptions =
  | FontIconClassNameOptions
  | SVGIconClassNameOptions
  | MaterialIconClassNameOptions
  | MaterialSymbolClassNameOptions;

export function icon(options: IconClassNameOptions): string {
  const { className, size = "medium", type, textColor } = options;

  const isFont = type === "font";
  const isSvg = type === "svg";
  const isSymbol = type === "symbol";
  const isMaterial = type === "material";

  let iconClassName = "";
  if (isFont) {
    ({ iconClassName = "material-icons" } = options);
  } else if (isMaterial) {
    const { family } = options;

    let suffix = "";
    if (family !== "filled") {
      const name = family === "rounded" ? "round" : family;
      suffix = `-${name}`;
    }

    iconClassName = `material-symbols${suffix}`;
  } else if (isSymbol) {
    const { family } = options;
    iconClassName = `material-symbols-${family}`;
  }

  return cnb(
    styles({
      svg: isSvg,
      font: isFont || isMaterial,
      symbol: isSymbol,
      [size]: size !== "medium",
      // vam: inline,
      // dense,
      // cc: isCurrentColor,
    }),
    palette({ textColor }),
    iconClassName,
    className
  );
}
