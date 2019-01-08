import * as React from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

/**
 * A union of all the material design provided typography styles. When used with the Text
 * component, this will generate the correct typography className to apply and determine
 * what component to be rendered as if none was provided.
 */
export type TextTypes =
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

/**
 * A union of the default supported elements that the `Text` component can be rendered as. This
 * is mostly used for adding the correct HTMLAttributes and enabling the forward ref.
 */
export type TextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

export type TextRenderFunction = ((
  props: { className: string }
) => React.ReactElement<any>);

export interface ITextProps extends React.HTMLAttributes<TextElement> {
  /**
   * An optional className to merge into typography styles.
   */
  className?: string;

  /**
   * The component to render as when the children are not a render function. If this prop
   * is omitted, the component will be determined by the `type` prop where:
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
  component?: React.ReactType | null;

  /**
   * One of the material design typography text styles. This is used to generate a className
   * that can be applied to any element and have the correct typography.
   */
  type?: TextTypes;

  /**
   * Either a child render function or a react node. If this is not the child render function, a
   * different wrapper component can be provided using the `component` prop.
   */
  children?: React.ReactNode | TextRenderFunction;
}

function getComponent(
  component: React.ReactType | null,
  type: TextTypes
): React.ReactType {
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

export interface ITextDefaultProps {
  type: TextTypes;
  component: React.ReactType | null;
}

export type TextWithDefaultProps = ITextProps &
  ITextDefaultProps &
  IWithForwardedRef<TextElement>;

/**
 * The `Text` component is used to render text with the material design typography styles applied.
 * By default, everything will be rendered in a `<p>` tag with the normal paragraph styles.
 *
 * When the `type` prop is changed to another typography style, this component will determine the
 * "best" element to render the text in *unless* the `component` prop is provided. The default
 * mapping is:
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
 * NOTE: if the `component` prop is not `null`, this logic will be ignored and the provided
 * `component` will be used instead.
 */
const Text: React.FunctionComponent<
  ITextProps & IWithForwardedRef<TextElement>
> = providedProps => {
  const {
    className: propClassName,
    children,
    type,
    component,
    forwardedRef,
    ...props
  } = providedProps as TextWithDefaultProps;

  const className = cn(`rmd-typography rmd-typography--${type}`, propClassName);
  if (typeof children === "function") {
    return (children as TextRenderFunction)({ className });
  }

  return React.createElement(
    getComponent(component, type),
    { ...props, className, ref: forwardedRef },
    children
  );
};

const defaultProps: ITextDefaultProps = {
  type: "body-1",
  component: null,
};

Text.defaultProps = defaultProps;

export default React.forwardRef<TextElement, ITextProps>((props, ref) => (
  <Text {...props} forwardedRef={ref} />
));
