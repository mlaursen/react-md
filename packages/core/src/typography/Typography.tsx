import { cnb } from "cnbuilder";
import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { type ThemeOrTextColor } from "../theme/types.js";

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
  className?: string;

  /**
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType;

  /** {@inheritDoc TextAlign} */
  align?: TextAlign;
  /** {@inheritDoc ThemeOrTextColor} */
  textColor?: ThemeOrTextColor;
  /** {@inheritDoc TextDecoration} */
  decoration?: TextDecoration;
  /** {@inheritDoc TextTransform} */
  transform?: TextTransform;
  /** {@inheritDoc FontWeight} */
  weight?: FontWeight;
  /** {@inheritDoc FontStyle} */
  fontStyle?: FontStyle;
  /**
   * @see {@link TypographyMargin}
   * @defaultValue `"initial"`
   */
  margin?: TypographyMargin;

  /**
   * @defaultValue `false`
   */
  disableLineWrap?: boolean;
}

/** @remarks \@since 6.0.0 */
export type NullableTypographyClassNameOptions = Omit<
  TypographyClassNameOptions,
  "type"
> & {
  /**
   * When using the {@link typography} class name utility, the `type` can be set
   * to `null` to inherit font.
   *
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType | null;
};

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
export function typography(
  options: NullableTypographyClassNameOptions = {}
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
    disableLineWrap,
  } = options;

  // using `&&` instead of `bem` since the latest version of typescript does not
  // support setting the same object key (empty string)
  const p = "rmd-typography--";
  return cnb(
    "rmd-typography",
    type && `${p}${type}`,
    margin === "none" && `${p}no-margin`,
    margin === "bottom" && `${p}no-margin-top`,
    margin === "top" && `${p}no-margin-bottom`,
    align && `${p}${align}`,
    // TODO: Implement text colors
    textColor && `${p}${textColor}`,
    decoration === "overline" && `${p}overline-decoration`,
    decoration && decoration !== "overline" && `${p}${decoration}`,
    transform && `${p}${transform}`,
    weight && `${p}${weight}`,
    fontStyle && `${p}${fontStyle}`,
    disableLineWrap && `${p}no-wrap`,
    className
  );
}

/**
 * A union of the default supported elements that the `Typography` component can
 * be rendered as. This is mostly used for adding the correct `HTMLAttributes`
 * and enabling the forward ref.
 *
 * @remarks \@since 4.0.0
 */
export type TypographyHTMLElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

/** @remarks \@since 6.0.0 */
export type CustomTypographyComponent = ElementType<
  HTMLAttributes<TypographyHTMLElement> & { className: string }
>;

/** @internal */
function getComponent(
  as: CustomTypographyComponent | undefined,
  type: TypographyType
): ElementType {
  if (as) {
    return as;
  }

  switch (type) {
    case "headline-1":
      return "h1";
    case "headline-2":
      return "h2";
    case "headline-3":
      return "h3";
    case "headline-4":
      return "h4";
    case "headline-5":
      return "h5";
    case "headline-6":
    case "subtitle-1":
    case "subtitle-2":
      return "h6";
    case "body-1":
    case "body-2":
      return "p";
    case "caption":
      return "caption";
    default:
      return "span";
  }
}

export interface TypographyProps
  extends HTMLAttributes<TypographyHTMLElement>,
    TypographyClassNameOptions {
  /**
   * The component to render as when the children are not a render function. If
   * this prop is omitted, the component will be determined by the `type` prop
   * where:
   *
   * - `"headline-1" -> <h1>`
   * - `"headline-2" -> <h2>`
   * - `"headline-3" -> <h3>`
   * - `"headline-4" -> <h4>`
   * - `"headline-5" -> <h5>`
   * - `"headline-6" -> <h6>`
   * - `"subtitle-1" -> <h5>`
   * - `"subtitle-2" -> <h6>`
   * - `"body-1"     -> <p>`
   * - `"body-2"     -> <p>`
   * - `"caption"    -> <caption>`
   * - `"overline"   -> <span>`
   */
  as?: CustomTypographyComponent;
}

/**
 * **Server Component**
 *
 * Render text with one of the material design typography styles applied and
 * optional styles like font-weight, font-style, text color, etc.
 *
 * @example
 * All Example
 * ```tsx
 * import { Typography } from "@react-md/core":
 *
 * export function Example() {
 *   return (
 *    <>
 *      <Typography type="headline-1">Headline 1</Typography>
 *      <Typography type="headline-2">Headline 2</Typography>
 *      <Typography type="headline-3">Headline 3</Typography>
 *      <Typography type="headline-4">Headline 4</Typography>
 *      <Typography type="headline-5">Headline 5</Typography>
 *      <Typography type="headline-6">Headline 6</Typography>
 *      <Typography type="subtitle-1">Subtitle 1</Typography>
 *      <Typography type="subtitle-2">Subtitle 2</Typography>
 *      <Typography>
 *        A paragraph of text.
 *      </Typography>
 *      <Typography type="body-1">
 *        A paragraph of text.
 *      </Typography>
 *      <Typography type="body-2">
 *        Another paragraph of text.
 *      </Typography>
 *      <Typography type="caption" component="h5">
 *        Caption text
 *      </Typography>
 *      <Typography type="overline" component="h5">
 *        Overline text
 *      </Typography>
 *    </>
 *   ):
 * }
 * ```
 */
export const Typography = forwardRef<TypographyHTMLElement, TypographyProps>(
  function Typography(props, ref): ReactElement {
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
      as,
      children,
      disableLineWrap,
      ...remaining
    } = props;

    const Component = getComponent(as, type);
    return (
      <Component
        {...remaining}
        ref={ref}
        className={typography({
          type,
          align,
          textColor,
          decoration,
          transform,
          weight,
          fontStyle,
          margin,
          disableLineWrap,
          className,
        })}
      >
        {children}
      </Component>
    );
  }
);
