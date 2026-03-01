import {
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type Ref,
} from "react";

import { type TypographyClassNameOptions, typography } from "./styles.js";

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

/**
 * @since 6.0.0 Renamed `component` to `as`.
 * @since 6.0.0 Removed the children render function behavior. Use the
 * `typography` class name utility instead.
 */
export interface TypographyProps
  extends HTMLAttributes<TypographyHTMLElement>, TypographyClassNameOptions {
  ref?: Ref<TypographyHTMLElement>;

  /**
   * The component to render as when the children are not a render function. If
   * this prop is omitted, the component will be determined by the `variant` prop
   * where:
   *
   * - `"display" -> <h1>`
   * - `"headline" -> <h2>`
   * - `"title" -> <h3>`
   * - `"label" -> <label>`
   * - `"body" -> <p>`
   *
   * @since 6.0.0 Renamed from `component`
   */
  as?: CustomTypographyComponent;
}

/**
 * Render text with one of the material design typography styles applied and
 * optional styles like font-weight, font-style, text color, etc.
 *
 * @example Simple Example
 * ```tsx
 * import { Typography } from "@react-md/you/typography/Typography";
 *
 * function Example() {
 *   return (
 *     <>
 *       <Typography>This renders as a large body in a p element.</Typography>
 *       <Typography variant="title">This renders as a large title in an h3 element.</Typography>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/typography | Typography Demos}
 * @since 6.0.0 Removed the children render function behavior . Use the
 * `typography` class name utility instead.
 * @since 8.0.0 Removed the `type` prop in favor of `variant`, `size`, and `prominent`.
 */
export function Typography(props: Readonly<TypographyProps>): ReactElement {
  const {
    ref,
    as,
    className,
    size = "large",
    variant = "body",
    prominent,
    margin,
    fontStyle,
    fontFamily,
    fontWeight,
    textAlign,
    textColor,
    textDecoration,
    textTransform,
    textOverflow,
    children,
    ...remaining
  } = props;

  let Component: ElementType;
  if (as) {
    Component = as;
  } else {
    switch (variant) {
      case "display":
        Component = "h1";
        break;
      case "headline":
        Component = "h2";
        break;
      case "title":
        Component = "h3";
        break;
      case "label":
        Component = "label";
        break;
      case "body":
        Component = "p";
        break;
    }
  }

  return (
    <Component
      {...remaining}
      ref={ref}
      className={typography({
        className,
        size,
        variant,
        prominent,
        margin,
        fontStyle,
        fontFamily,
        fontWeight,
        textAlign,
        textColor,
        textDecoration,
        textTransform,
        textOverflow,
      })}
    >
      {children}
    </Component>
  );
}
