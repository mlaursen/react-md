import { cnb } from "cnbuilder";

import { css } from "../styles/css.js";
import { type FontAndTextClassNameOptions } from "../styles/font.js";
import { type MarginClassNameOptions } from "../styles/margin.js";
import { type PaletteTextColorClassNameOptions } from "../styles/palette.js";
import { type DefaultComponentSize } from "../styles/size.js";
import { type OverridableStringUnion } from "../types.js";

/**
 * @since 8.0.0
 */
export interface TypographySizeOverrides {}

/**
 * @since 8.0.0
 */
export type TypographySize = OverridableStringUnion<
  DefaultComponentSize,
  TypographySizeOverrides
>;

/**
 * @since 8.0.0
 */
export interface TypographyVariantOverrides {}

/**
 * @since 8.0.0
 */
export type DefaultTypographyVariant =
  | "body"
  | "label"
  | "title"
  | "headline"
  | "display";

/**
 * @since 8.0.0
 */
export type TypographyVariant = OverridableStringUnion<
  DefaultTypographyVariant,
  TypographyVariantOverrides
>;

/**
 * @since 8.0.0
 */
export interface TypographyVariantClassNameOptions {
  /**
   * @defaultValue `"large"`
   */
  size?: TypographySize;

  /**
   * @defaultValue `"body"`
   */
  variant?: TypographyVariant;

  /**
   * @defaultValue `false`
   */
  prominent?: boolean;
}

/**
 * @since 8.0.0
 */
export interface TypographyClassNameOptions
  extends
    TypographyVariantClassNameOptions,
    PaletteTextColorClassNameOptions,
    MarginClassNameOptions,
    FontAndTextClassNameOptions {
  className?: string;
}

/**
 * @since 8.0.0
 */
export function typography(options: TypographyClassNameOptions = {}): string {
  const {
    size = "large",
    variant = "body",
    prominent,
    ...cssOptions
  } = options;

  const suffix = prominent ? "-prominent" : "";
  return cnb(`rmd-typography-${variant}-${size}${suffix}`, css(cssOptions));
}
