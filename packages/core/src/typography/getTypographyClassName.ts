import { cnb } from "cnbuilder";
import { bem } from "../bem";

/**
 * A union of all the material design provided typography styles. When used with
 * the Typography component, this will generate the correct typography className
 * to apply and determine what component to be rendered as if none was provided.
 *
 * @remarks \@since 4.0.0
 */
export type TypographyType =
  | "headline-1"
  | "headline-2"
  | "headline-3"
  | "headline-4"
  | "headline-5"
  | "headline-6"
  | "subtitle-1"
  | "subtitle-2"
  | "body-1"
  | "body-2"
  | "caption"
  | "overline";

/**
 * The supported css `text-align` values.
 */
export type TextAlign = "left" | "center" | "right";

/**
 * The supported css `text-decoration` values.
 */
export type TextDecoration = "underline" | "overline" | "line-through";

/**
 * The supported css `text-transform` values.
 */
export type TextTransform = "capitalize" | "uppercase" | "lowercase";

/**
 * The supported css `font-weight` values.
 *
 * Note: You will need to ensure that you are using a web safe font for all the
 * font weights to work, use variable fonts, or load all font weights for your
 * custom font.
 *
 * @see {@link https://www.google.com/search?q=web+safe+fonts | Web Safe Fonts}
 * @see {@link https://www.google.com/search?q=variable+fonts | Variable FOnts}
 * @remarks \@since 6.0.0 This was `TextWeight` beforehand.
 */
export type FontWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semi-bold"
  | "black";

/**
 * An optional text color to apply. These values map to:
 *
 * - `undefined` - current text color
 * - `secondary` - slightly lighter than the default text color
 * - `hint` - slightly lighter than the secondary color
 * - `theme-primary` - the primary color set for your app
 * - `theme-secondary` - the secondary color set for your app
 * - `theme-warning` - the warning color set for your app
 * - `theme-error` - the error color set for your app
 */
export type TextColor =
  | "secondary"
  | "hint"
  | "theme-primary"
  | "theme-secondary"
  | "theme-warning"
  | "theme-error";

/**
 * Since the typography within react-md tries to not modify base elements, the
 * default margin applied to heading tags (h1-h6) and paragraph (p) might have
 * large margin that you don't want applied when using this component. You can
 * disable:
 *
 * - only the top margin by setting this prop to `"bottom"`
 * - only the bottom margin by setting this prop to `"top"`
 * - top and bottom margin by setting this prop to `"none"`
 * - or keep the initial behavior: `"initial"`
 *
 * @remarks \@since 6.0.0
 */
export type TypographyMargin = "initial" | "none" | "top" | "bottom";

/**
 * The supported css `font-style` values.
 */
export type FontStyle = "italic" | "oblique" | "normal";

/** @remarks \@since 6.0.0 */
export interface TypographyClassNameOptions {
  /**
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType;

  /** {@inheritdoc TextAlign} */
  align?: TextAlign;
  /** {@inheritdoc TextColor} */
  textColor?: TextColor;
  /** {@inheritdoc TextDecoration} */
  decoration?: TextDecoration;
  /** {@inheritdoc TextTransform} */
  transform?: TextTransform;
  /** {@inheritdoc FontWeight} */
  weight?: FontWeight;
  /** {@inheritdoc FontStyle} */
  fontStyle?: FontStyle;
  /**
   * @see {@link TypographyMargin}
   * @defaultValue `"initial"`
   */
  margin?: TypographyMargin;

  /**
   * An optional className to merge into typography styles.
   */
  className?: string;
}

const styles = bem("rmd-typography");

/**
 * Get a typography class name based on different typography options. This is
 * only useful if you are unable to use the {@link Typography} component for
 * some reason.
 *
 * @example
 * Simple Example
 * ```ts
 * import { getTypographyClassName } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1 className={getTypographyClassName({ type: "headline-1" })} />
 *       <h2 className={getTypographyClassName({ type: "headline-2" })} />
 *       <h3 className={getTypographyClassName({ type: "headline-3" })} />
 *       <h4 className={getTypographyClassName({ type: "headline-4" })} />
 *       <h5 className={getTypographyClassName({ type: "headline-5" })} />
 *       <h6 className={getTypographyClassName({ type: "headline-6" })} />
 *       <h5 className={getTypographyClassName({ type: "subtitle-1" })} />
 *       <h6 className={getTypographyClassName({ type: "subtitle-2" })} />
 *       <p className={getTypographyClassName()} />
 *       <p className={getTypographyClassName({ type "body-1" })} />
 *       <p className={getTypographyClassName({ type "body-1" })} />
 *       <caption className={getTypographyClassName({ type: "caption" })} />
 *       <span className={getTypographyClassName({ type: "overline" })} />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Applying Additional Styles
 * ```ts
 * import { getTypography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1
 *         // only maintain the default margin-bottom
 *         className={getTypographyClassName({
 *           type: "headline-1",
 *           margin: "bottom",
 *         })}
 *        />
 *
 *       <h2
 *         // remove all default margin
 *         className={getTypographyClassName({
 *           type: "headline-2",
 *           margin: "none",
 *         })}
 *       />
 *
 *       <h3
 *         // only maintain the default margin-top
 *         className={getTypographyClassName({
 *           type: "headline-3",
 *           margin: "top",
 *         })}
 *       />
 *
 *       <p
 *         // center the text, set to bold, and only maintain default margin-bottom
 *         className={getTypographyClassName({
 *           type "subtitle-1",
 *           align: "center",
 *           margin: "bottom",
 *         })}
 *       />
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link Typography}
 * @param options - An optional object of options used to create the typography
 * class name.
 * @returns a typography class name string
 * @remarks \@since 6.0.0
 */
export function getTypographyClassName(
  options: TypographyClassNameOptions = {}
): string {
  const {
    type = "body-1",
    align,
    textColor,
    decoration,
    transform,
    weight,
    fontStyle,
    margin = "initial",
    className,
  } = options;

  return cnb(
    styles({
      [type]: true,
      "no-margin": margin === "none",
      "no-margin-top": margin === "bottom",
      "no-margin-bottom": margin === "top",
      [align || ""]: align,
      [decoration || ""]: decoration && decoration !== "overline",
      [textColor || ""]: textColor,
      // only because "overline" is technically one of the valid material design types :/
      "overline-decoration": decoration === "overline",
      [transform || ""]: transform,
      [weight || ""]: weight,
      [fontStyle || ""]: fontStyle,
    }),
    className
  );
}
