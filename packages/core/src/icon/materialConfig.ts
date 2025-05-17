import { type CSSProperties } from "react";

import {
  type MaterialIconFamily,
  type MaterialSymbolFamily,
} from "./material.js";

/**
 * @since 6.0.0
 */
export interface MaterialIconCustomization {
  /**
   * @defaultValue `"filled"`
   */
  iconFamily?: MaterialIconFamily;
}

/**
 * @since 6.0.0
 */
export type MaterialIconConfiguration = Required<MaterialIconCustomization>;

/**
 * Fill gives you the ability to modify the default icon style. A single icon
 * can render both unfilled and filled states.
 *
 * To convey a state transition, use the fill axis for animation or
 * interaction. The values are 0 for default or 1 for completely filled. Along
 * with the weight axis, the fill also impacts the look of the icon.
 *
 * @since 6.0.0
 */
export type MaterialSymbolFill = 0 | 1;

/**
 * Weight defines the symbol’s stroke weight, with a range of weights between
 * thin (100) and bold (700). Weight can also affect the overall size of the
 * symbol.
 *
 * @since 6.0.0
 */
export type MaterialSymbolWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

/**
 * Weight and grade affect a symbol’s thickness. Adjustments to grade are more
 * granular than adjustments to weight and have a small impact on the size of
 * the symbol.
 *
 * Grade is also available in some text fonts. You can match grade levels
 * between text and symbols for a harmonious visual effect. For example, if
 * the text font has a -25 grade value, the symbols can match it with a
 * suitable value, say -25.
 *
 * You can use grade for different needs:
 *
 * - Low emphasis (e.g. -25 grade): To reduce glare for a light symbol on a
 *   dark background, use a low grade.
 * - High emphasis (e.g. 200 grade): To highlight a symbol, increase the
 *   positive grade.
 *
 * @since 6.0.0
 */
export type MaterialSymbolGrade = -25 | 0 | 200;

/**
 * Optical Sizes range from 20dp to 48dp.
 *
 * For the image to look the same at different sizes, the stroke weight
 * (thickness) changes as the icon size scales. Optical Size offers a way to
 * automatically adjust the stroke weight when you increase or decrease the
 * symbol size.
 *
 * @since 6.0.0
 */
export type MaterialSymbolOpticalSize = 20 | 24 | 40 | 48;

/**
 * The comments for each customizable part was copied from
 * https://fonts.google.com/icons?icon.set=Material+Symbols and clicking the
 * info icon next to each property.
 *
 * @see https://fonts.google.com/icons?icon.set=Material+Symbols
 * @since 6.0.0
 */
export interface MaterialSymbolCustomization {
  /**
   * Fill gives you the ability to modify the default icon style. A single icon
   * can render both unfilled and filled states.
   *
   * To convey a state transition, use the fill axis for animation or
   * interaction. The values are 0 for default or 1 for completely filled. Along
   * with the weight axis, the fill also impacts the look of the icon.
   *
   * @defaultValue `0`
   */
  fill?: MaterialSymbolFill;

  /**
   * Weight defines the symbol’s stroke weight, with a range of weights between
   * thin (100) and bold (700). Weight can also affect the overall size of the
   * symbol.
   *
   * @defaultValue `400`
   */
  weight?: MaterialSymbolWeight;

  /**
   * Weight and grade affect a symbol’s thickness. Adjustments to grade are more
   * granular than adjustments to weight and have a small impact on the size of
   * the symbol.
   *
   * Grade is also available in some text fonts. You can match grade levels
   * between text and symbols for a harmonious visual effect. For example, if
   * the text font has a -25 grade value, the symbols can match it with a
   * suitable value, say -25.
   *
   * You can use grade for different needs:
   *
   * - Low emphasis (e.g. -25 grade): To reduce glare for a light symbol on a
   *   dark background, use a low grade.
   * - High emphasis (e.g. 200 grade): To highlight a symbol, increase the
   *   positive grade.
   *
   * @defaultValue `0`
   */
  grade?: MaterialSymbolGrade;

  /**
   * Optical Sizes range from 20dp to 48dp.
   *
   * For the image to look the same at different sizes, the stroke weight
   * (thickness) changes as the icon size scales. Optical Size offers a way to
   * automatically adjust the stroke weight when you increase or decrease the
   * symbol size.
   *
   * @defaultValue `48`
   */
  opticalSize?: MaterialSymbolOpticalSize;

  /**
   * @defaultValue `"outlined"`
   */
  family?: MaterialSymbolFamily;
}

/**
 * @since 6.0.0
 */
export type MaterialSymbolConfiguration = Required<MaterialSymbolCustomization>;

/**
 * @since 6.0.0
 */
export interface MaterialConfiguration
  extends MaterialIconConfiguration,
    MaterialSymbolConfiguration {}

/**
 * @since 6.0.0
 */
export const MATERIAL_CONFIG: MaterialConfiguration = {
  fill: 0,
  weight: 400,
  grade: 0,
  opticalSize: 48,
  iconFamily: "filled",
  family: "outlined",
};

/**
 * @since 6.0.0
 */
export interface MaterialSymbolFontVariationSettings {
  style?: CSSProperties;
  family: MaterialSymbolFamily;
}

interface ApplyOptions {
  name: "fill" | "wght" | "grad" | "opsz";
  value: number | undefined;
  defaultValue: number;
  style: CSSProperties | undefined;
}

const applyVar = (options: ApplyOptions): CSSProperties | undefined => {
  const { name, value, defaultValue, style } = options;
  if (typeof value !== "undefined" && value !== defaultValue) {
    const varName = `--rmd-symbol-${name}` as const;
    return {
      ...style,
      [varName]: value,
    };
  }

  return style;
};

/**
 * @since 6.0.0
 * @internal
 */
export function getFontVariationSettings(
  options: MaterialSymbolCustomization & { style?: CSSProperties }
): MaterialSymbolFontVariationSettings {
  const {
    family = MATERIAL_CONFIG.family,
    fill,
    grade,
    opticalSize,
    weight,
  } = options;
  let { style } = options;
  style = applyVar({
    style,
    name: "fill",
    value: fill,
    defaultValue: MATERIAL_CONFIG.fill,
  });
  style = applyVar({
    style,
    name: "grad",
    value: grade,
    defaultValue: MATERIAL_CONFIG.grade,
  });
  style = applyVar({
    style,
    name: "opsz",
    value: opticalSize,
    defaultValue: MATERIAL_CONFIG.opticalSize,
  });
  style = applyVar({
    style,
    name: "wght",
    value: weight,
    defaultValue: MATERIAL_CONFIG.weight,
  });

  return { style, family };
}
