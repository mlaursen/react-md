import {
  forwardRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import {
  typography,
  type TypographyClassNameOptions,
  type TypographyType,
} from "./typographyStyles.js";

/**
 * A union of the default supported elements that the `Typography` component can
 * be rendered as. This is mostly used for adding the correct `HTMLAttributes`
 * and enabling the forward ref.
 *
 * @since 4.0.0
 */
export type TypographyHTMLElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

/** @since 6.0.0 */
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
 * @example All Example
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
