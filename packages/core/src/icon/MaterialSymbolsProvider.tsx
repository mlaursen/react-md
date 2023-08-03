"use client";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import type { MaterialSymbolFamily } from "./material";

/**
 * Fill gives you the ability to modify the default icon style. A single icon
 * can render both unfilled and filled states.
 *
 * To convey a state transition, use the fill axis for animation or
 * interaction. The values are 0 for default or 1 for completely filled. Along
 * with the weight axis, the fill also impacts the look of the icon.
 *
 * @remarks \@since 6.0.0
 */
export type MaterialSymbolFill = 0 | 1;

/**
 * Weight defines the symbol’s stroke weight, with a range of weights between
 * thin (100) and bold (700). Weight can also affect the overall size of the
 * symbol.
 *
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
 */
export type MaterialSymbolOpticalSize = 20 | 24 | 40 | 48;

/**
 * The comments for each customizable part was copied from
 * https://fonts.google.com/icons?icon.set=Material+Symbols and clicking the
 * info icon next to each property.
 *
 * @see https://fonts.google.com/icons?icon.set=Material+Symbols
 * @remarks \@since 6.0.0
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
 * @remarks \@since 6.0.0
 */
export type MaterialSymbolConfiguration = Required<MaterialSymbolCustomization>;

const context = createContext<MaterialSymbolConfiguration>({
  fill: 0,
  weight: 400,
  grade: 0,
  opticalSize: 24,
  family: "outlined",
});
context.displayName = "MaterialSymbol";
const { Provider } = context;

/**
 * @remarks \@since 6.0.0
 */
export function useMaterialSymbolConfiguration(): MaterialSymbolConfiguration {
  return useContext(context);
}

/**
 * @remarks \@since 6.0.0
 */
export function useFontVariationSettings(
  options: MaterialSymbolCustomization & { style?: CSSProperties }
): { style?: CSSProperties; family: MaterialSymbolFamily } {
  const configuration = useMaterialSymbolConfiguration();
  let { style } = options;
  const {
    fill = configuration.fill,
    grade = configuration.grade,
    opticalSize = configuration.opticalSize,
    weight = configuration.weight,
    family = configuration.family,
  } = options;
  if (
    !style?.fontVariationSettings &&
    (fill !== configuration.fill ||
      grade !== configuration.grade ||
      opticalSize !== configuration.opticalSize ||
      weight !== configuration.weight)
  ) {
    style = {
      ...style,
      fontVariationSettings: `"FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize}`,
    };
  }

  return { family, style };
}

/**
 * @remarks \@since 6.0.0
 */
export interface MaterialSymbolsProviderProps
  extends MaterialSymbolCustomization {
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @remarks \@since 6.0.0
 */
export function MaterialSymbolsProvider(
  props: MaterialSymbolsProviderProps
): ReactElement {
  const {
    fill = 0,
    weight = 400,
    grade = 0,
    family: type = "outlined",
    opticalSize = 48,
    children,
  } = props;
  const value = useMemo<MaterialSymbolConfiguration>(
    () => ({
      fill,
      weight,
      grade,
      family: type,
      opticalSize,
    }),
    [fill, grade, opticalSize, type, weight]
  );

  return <Provider value={value}>{children}</Provider>;
}
