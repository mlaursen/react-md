import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

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
 * A list of the default supported elements that the `Text` component can be rendered as. This is mostly used
 * for adding the correct HTMLAttributes and enabling the forward ref.
 */
export type DefaultTextElement =
  | HTMLHeadingElement
  | HTMLParagraphElement
  | HTMLSpanElement
  | HTMLDivElement
  | HTMLButtonElement
  | HTMLTableCaptionElement
  | HTMLAnchorElement
  | HTMLBodyElement
  | HTMLHtmlElement;

/**
 * The default additional props that can be applied to the Text component. This mostly just
 * covers all the elements that can be rendered "natively".
 */
export type DefaultTextProps = React.HTMLAttributes<DefaultTextElement>;

/**
 * A type describing the text component's children render function. It provides an object containing
 * the correct (and merged) className and expects a renderable element to be returned.
 */
export type TextRenderFunction = (props: { className: string }) => React.ReactNode;

/**
 * The base props for rendering the text component.
 *
 * @typeparam P - Any additional props that are available based on the component prop.
 */
export interface ITextProps<P = DefaultTextProps> {
  /**
   * An optional className to merge into typography styles.
   */
  className?: string;

  /**
   * The component to render as when the children are not a render function. If this prop is omitted,
   * the component will be determined by the `type` prop where:
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
  component?: React.ReactType<P> | null;

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

  /**
   * @private
   */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

/**
 * The default defined props for the text component.
 */
export interface ITextDefaultProps {
  type: TextTypes;
  component: React.ReactType | null;
}

/**
 * @private
 */
export type TextWithDefaultProps<P = DefaultTextProps> = ITextProps<P> & ITextDefaultProps;

/**
 * The `Text` component is used to render text with the material design typography styles applied. By
 * default, everything will be rendered in a `<p>` tag with the normal paragraph styles.
 *
 * When the `type` prop is changed to another typography style, this component will determine the "best"
 * element to render the text in *unless* the `component` prop is provided. The default mapping is:
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
 * NOTE: if the `component` prop is not `null`, this logic will be ignored and the provided `component`
 * will be used instead.
 *
 * @forwardRef
 * @typeparam P - Any additional props that are valid when using the `component` prop or the built-in
 * "auto-component" logic. By default, this will just allow any HTMLElement props for each the default
 * elements in the "auto-component" logic.
 */
class Text<P extends {} = DefaultTextProps> extends React.Component<ITextProps<P> & P> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
    type: PropTypes.oneOf([
      "headline-1",
      "headline-2",
      "headline-3",
      "headline-4",
      "headline-5",
      "headline-6",
      "subtitle-1",
      "subtitle-2",
      "body-1",
      "body-2",
      "caption",
      "overline",
      "button",
    ]),
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  };

  public static defaultProps: ITextDefaultProps = {
    type: "body-1",
    component: null,
  };

  public render() {
    const { className: propClassName, component, type, children, forwardedRef, ...props } = this
      .props as TextWithDefaultProps<DefaultTextProps>;

    const className = cn(`rmd-typography rmd-typography--${type}`, propClassName);
    if (typeof children === "function") {
      return (children as TextRenderFunction)({ className });
    }

    const Component = this.getComponent(component, type);
    return (
      <Component {...props} ref={forwardedRef} className={className}>
        {children}
      </Component>
    );
  }

  /**
   * A utility function to get the html tag the Text component should render as. This component will
   * attempt to render as the provided `component` or some auto-logic for determine what html tag
   * should be used for styling. All fallbacks will be to place the children in a span element.
   */
  private getComponent = (component: React.ReactType<P> | null, type: TextTypes) => {
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
  };
}

export default React.forwardRef<DefaultTextElement, ITextProps>((props, ref) => (
  <Text {...props} forwardedRef={ref} />
));
