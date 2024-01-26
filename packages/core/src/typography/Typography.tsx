import { cnb } from "cnbuilder";
import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { cssUtils, type TextCssUtilsOptions } from "../cssUtils.js";

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

/** @remarks \@since 6.0.0 */
export interface TypographyClassNameOptions extends TextCssUtilsOptions {
  className?: string;

  /**
   * @see {@link TypographyType}
   * @defaultValue `"body-1"`
   */
  type?: TypographyType;
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
 * import { typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1 className={typography({ type: "headline-1" })} />
 *       <h2 className={typography({ type: "headline-2" })} />
 *       <h3 className={typography({ type: "headline-3" })} />
 *       <h4 className={typography({ type: "headline-4" })} />
 *       <h5 className={typography({ type: "headline-5" })} />
 *       <h6 className={typography({ type: "headline-6" })} />
 *       <h5 className={typography({ type: "subtitle-1" })} />
 *       <h6 className={typography({ type: "subtitle-2" })} />
 *       <p className={typography()} />
 *       <p className={typography({ type "body-1" })} />
 *       <p className={typography({ type "body-1" })} />
 *       <caption className={typography({ type: "caption" })} />
 *       <span className={typography({ type: "overline" })} />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * Applying Additional Styles
 * ```ts
 * import { typography } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <>
 *       <h1
 *         // only maintain the default margin-bottom
 *         className={typography({
 *           type: "headline-1",
 *           margin: "bottom",
 *         })}
 *        />
 *
 *       <h2
 *         // remove all default margin
 *         className={typography({
 *           type: "headline-2",
 *           margin: "none",
 *         })}
 *       />
 *
 *       <h3
 *         // only maintain the default margin-top
 *         className={typography({
 *           type: "headline-3",
 *           margin: "top",
 *         })}
 *       />
 *
 *       <p
 *         // center the text, set to bold, and only maintain default margin-bottom
 *         className={typography({
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
  const { type = "body-1" } = options;

  // using `&&` instead of `bem` since the latest version of typescript does not
  // support setting the same object key (empty string)
  return cnb(
    "rmd-typography",
    type && `rmd-typography--${type}`,
    cssUtils(options)
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
      as,
      type = "body-1",
      className,
      margin,
      fontStyle,
      fontWeight,
      textAlign,
      textColor,
      textDecoration,
      textTransform,
      textOverflow,
      children,
      ...remaining
    } = props;

    const Component = getComponent(as, type);
    return (
      <Component
        {...remaining}
        ref={ref}
        className={typography({
          type,
          margin,
          fontStyle,
          fontWeight,
          textAlign,
          textColor,
          textDecoration,
          textTransform,
          textOverflow,
          className,
        })}
      >
        {children}
      </Component>
    );
  }
);
