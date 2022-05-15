import type {
  ElementType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { createElement, forwardRef } from "react";
import cn from "classnames";
import type { ClassNameCloneableChild } from "@react-md/utils";
import { bem } from "@react-md/utils";

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
  | "overline"
  | "button";

export type TextAlign = "left" | "center" | "right";
export type TextDecoration = "underline" | "overline" | "line-through";
export type TextTransform = "capitalize" | "uppercase" | "lowercase";
export type TextWeight =
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | "semi-bold"
  | "black";
export type TextColor =
  | "secondary"
  | "hint"
  | "theme-primary"
  | "theme-secondary"
  | "theme-warning"
  | "theme-error";
export type FontStyle = "italic" | "oblique" | "normal";

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
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

/** @remarks \@since 4.0.0 */
export type TypographyRenderFunction = (props: {
  className: string;
}) => ReactElement;

export interface TypographyProps extends HTMLAttributes<TypographyHTMLElement> {
  /**
   * An optional className to merge into typography styles.
   */
  className?: string;

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
   * - `"button"     -> <button>`
   *
   */
  component?: ElementType | null;

  /**
   * One of the material design typography text styles. This is used to generate
   * a className that can be applied to any element and have the correct
   * typography.
   */
  type?: TypographyType;

  /**
   * Either a child render function or a react node. If this is not the child
   * render function, a different wrapper component can be provided using the
   * `component` prop.
   */
  children?: ReactNode | ClassNameCloneableChild | TypographyRenderFunction;

  /**
   * An optional text alignment to apply.
   */
  align?: TextAlign;

  /**
   * An optional text color to apply. Unlike normal theme colors, these will
   * reflect the `text-secondary-on-background` and `text-hint-on-background`
   * instead of the primary or secondary theme colors.
   */
  color?: TextColor;

  /**
   * An optional text decoration to apply.
   */
  decoration?: TextDecoration;

  /**
   * An optional text transformation to apply.
   */
  transform?: TextTransform;

  /**
   * An optional font-weight to apply.
   */
  weight?: TextWeight;

  /**
   * An optional font-style to apply.
   */
  fontStyle?: FontStyle;

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
   */
  margin?: "initial" | "none" | "top" | "bottom";
}

function getComponent(
  component: ElementType | null,
  type: TypographyType
): ElementType {
  if (component) {
    return component;
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
    case "button":
      return "button";
    default:
      return "span";
  }
}

const block = bem("rmd-typography");

/**
 * The `Typography` component is used to render text with the material design
 * typography styles applied.  By default, everything will be rendered in a
 * `<p>` tag with the normal paragraph styles.
 *
 * When the `type` prop is changed to another typography style, this component
 * will determine the "best" element to render the text in *unless* the
 * `component` prop is provided. The default mapping is:
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
 * - `"button"     -> <button>`
 *
 * NOTE: if the `component` prop is not `null`, this logic will be ignored and
 * the provided `component` will be used instead.
 */
export const Typography = forwardRef<TypographyHTMLElement, TypographyProps>(
  function Typography(
    {
      className: propClassName,
      children,
      type = "body-1",
      component = null,
      align,
      color,
      decoration,
      transform,
      weight,
      fontStyle,
      margin = "initial",
      ...props
    },
    ref
  ) {
    const className = cn(
      block({
        [type]: true,
        "no-margin": margin === "none",
        "no-margin-top": margin === "bottom",
        "no-margin-bottom": margin === "top",
        [align || ""]: align,
        [decoration || ""]: decoration && decoration !== "overline",
        [color || ""]: color,
        // only because "overline" is technically one of the valid material design types :/
        "overline-decoration": decoration === "overline",
        [transform || ""]: transform,
        [weight || ""]: weight,
        [fontStyle || ""]: fontStyle,
      }),
      propClassName
    );
    if (typeof children === "function") {
      return (children as TypographyRenderFunction)({ className });
    }

    return createElement(
      getComponent(component, type),
      { ...props, className, ref },
      children
    );
  }
);
