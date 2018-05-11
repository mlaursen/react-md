import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";
import { IBaseProps } from "@react-md/internal-types";

export interface ITextChildrenFunction {
  className: string;
}

export type TextTypes = "headline-1"
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

export interface ITextProps extends IBaseProps {
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "button" | "caption";
  type?: TextTypes | null;
  children?: React.ReactNode | ((props: ITextChildrenFunction) => React.ReactNode | null);
}

export interface ITextState {
  Component: React.ReactType | null;
}

/**
 * A utility function to get the html tag the Text component should render as. This component will
 * attempt to render as the provided `tagName` or some auto-logic for determinine what html tag
 * should be used for styling. All fallbacks will be to place the children in a span element.
 *
 * When the component should be rendered as text, null will be returned. Otherwise
 * the string html tag name will be returned.
 */
function getComponent(props: ITextProps): string {
  const { tagName, type } = props;

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
      default:
        // button and overline
        return "span";
    }
  }

  return "span";
}

export default class Text extends React.Component<ITextProps, ITextState> {
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
      "button",
      "caption",
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
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
  };

  public static getDerivedStateFromProps(nextProps: ITextProps, prevState: ITextState): ITextState | null {
    const Component = getComponent(nextProps);
    if (prevState.Component !== Component) {
      return { Component };
    }

    return null;
  }

  public state = { Component: null };

  public render() {
    const { Component } = this.state;
    const {
      className: propClassName,
      children,
      tagName,
      type,
      ...props
    } = this.props;

    const className = cn("md-typography", {
      [`md-typography--${type}`]: !!type,
    }, propClassName);

    if (typeof children === "function") {
      return children({ className });
    } else if (!Component) {
      return children;
    }

    return React.createElement(Component, { ...props, className }, children);
  }
}
