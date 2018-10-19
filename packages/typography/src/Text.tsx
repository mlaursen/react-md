import * as React from "react";
import * as PropTypes from "prop-types";
import memoizeOne from "memoize-one";
import cn from "classnames";

export type TextChildrenFunction = (props: { className: string }) => React.ReactNode;

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

export type TextHtmlTags =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "a"
  | "button"
  | "caption"
  | "blockquote"
  | "body"
  | "html";

export interface ITextProps
  extends React.HTMLAttributes<
      | HTMLHeadingElement
      | HTMLParagraphElement
      | HTMLSpanElement
      | HTMLDivElement
      | HTMLButtonElement
      | HTMLTableCaptionElement
      | HTMLAnchorElement
      | HTMLBodyElement
      | HTMLHtmlElement
    > {
  /**
   * An optional html tag name to render in. If this is omitted, it will determine the "best" tag
   * based on the provided `type`.
   *
   * @docgen
   */
  tagName?: TextHtmlTags;

  /**
   * An optional text type to render as. If both this and the tagName are omitted, only the base typography styles
   * will be applied.
   *
   * @docgen
   */
  type?: TextTypes;

  /**
   * This can either be any renderable element or a children callback function that gets provided the current class
   * name.
   *
   * @docgen
   */
  children?: React.ReactNode | TextChildrenFunction;
}

export default class Text extends React.Component<ITextProps, {}> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    tagName: PropTypes.oneOf([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "div",
      "a",
      "button",
      "caption",
      "blockquote",
      "html",
      "body",
    ]),
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

  /**
   * A utility function to get the html tag the Text component should render as. This component will
   * attempt to render as the provided `tagName` or some auto-logic for determinine what html tag
   * should be used for styling. All fallbacks will be to place the children in a span element.
   *
   * When the component should be rendered as text, null will be returned. Otherwise
   * the string html tag name will be returned.
   */
  private getComponent = memoizeOne((tagName?: TextHtmlTags, type?: TextTypes) => {
    if (tagName) {
      return tagName;
    } else if (type) {
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
  });

  private determineType = memoizeOne((component?: TextHtmlTags, type?: TextTypes) => {
    if (type || !component) {
      return type;
    }

    switch (component) {
      case "h1":
        return "headline-1";
      case "h2":
        return "headline-2";
      case "h3":
        return "headline-3";
      case "h4":
        return "headline-4";
      case "h5":
        return "headline-5";
      case "h6":
        return "headline-6";
      case "p":
        return "body-1";
      case "caption":
        return "caption";
      case "button":
        return "button";
      default:
        return "span";
    }
  });

  public render() {
    const { className: propClassName, children, tagName, type: propType, ...props } = this.props;

    const component = this.getComponent(tagName, propType);
    const type = this.determineType(component, propType);
    const className = cn(
      {
        "rmd-typography": !type,
        [`rmd-typography--${type}`]: !!type,
      },
      propClassName
    );

    if (typeof children === "function") {
      return (children as TextChildrenFunction)({ className });
    }

    if (!component) {
      return children;
    }

    return React.createElement(component, { ...props, className }, children);
  }
}
