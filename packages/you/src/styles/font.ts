import { cnb } from "cnbuilder";

import { type OverridableStringUnion } from "../types.js";

/**
 * @since 8.0.0
 */
export type DefaultFontFamily = "brand" | "plain" | "monospace";

/**
 * @since 8.0.0
 */
export interface FontFamilyOverrides {}

/**
 * @since 8.0.0
 */
export type FontFamily = OverridableStringUnion<
  DefaultFontFamily,
  FontFamilyOverrides
>;

export type FontStyle = "italic" | "oblique" | "normal";

/**
 * @since 8.0.0
 */
export type DefaultFontWeight = "regular" | "medium" | "bold";

/**
 * @since 8.0.0
 */
export interface FontWeightOverrides {}

/**
 * The supported css `font-weight` values.
 *
 * Note: You will need to ensure that you are using a web safe font for all the
 * font weights to work, use variable fonts, or load all font weights for your
 * custom font.
 *
 * @see {@link https://www.google.com/search?q=web+safe+fonts | Web Safe Fonts}
 * @see {@link https://www.google.com/search?q=variable+fonts | Variable Fonts}
 *
 * @since 6.0.0 This was `TextWeight` beforehand.
 * @since 8.0.0 Removed `"thin"`, `"light"`, `"semi-bold"`, and `"black"`
 * @since 8.0.0 Supports overridable values
 */
export type FontWeight = OverridableStringUnion<
  DefaultFontWeight,
  FontWeightOverrides
>;

export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "underline" | "overline" | "line-through" | "none";
export type TextTransform = "capitalize" | "uppercase" | "lowercase";

/** @since 6.0.0 */
export type TextOverflow = "allow" | "nowrap" | "ellipsis";

/**
 * @since 8.0.0
 */
export interface FontAndTextClassNameOptions {
  className?: string;

  fontStyle?: FontStyle;
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;

  textAlign?: TextAlign;
  textDecoration?: TextDecoration;
  textTransform?: TextTransform;

  /**
   * Set this to `"nowrap"` to only prevent line wrap behavior or `"ellipsis"`
   * to also hide additional text with ellipsis.
   *
   * @defaultValue `"allow"`
   */
  textOverflow?: TextOverflow;
}

/**
 * @since 8.0.0
 */
export function font(options: FontAndTextClassNameOptions = {}): string {
  const {
    className,
    fontFamily,
    fontStyle,
    fontWeight,
    textAlign,
    textDecoration,
    textTransform,
    textOverflow,
  } = options;

  return cnb(
    fontFamily && `rmd-font-family-${fontFamily}`,
    fontWeight && `rmd-font-weight-${fontWeight}`,
    fontStyle && `rmd-${fontStyle}`,
    textAlign && `rmd-align-${textAlign}`,
    textDecoration && `rmd-${textDecoration}`,
    textTransform && `rmd-${textTransform}`,
    textOverflow && textOverflow !== "allow" && `rmd-${textOverflow}`,
    className
  );
}
