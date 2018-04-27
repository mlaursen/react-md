import * as cn from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";
import {
  IBaseProps,
  FontWeights,
  TextAligns,
  TextDecorations,
} from "../types";

export interface ITextChildrenFunction {
  className: string;
}

export interface ITextProps extends IBaseProps {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "section" | "aside" | "caption" | "p" | "span" | null;
  weight?: FontWeights;
  decoration?: TextDecorations;
  align?: TextAligns;
  h?: 1 | 2 | 3 | 4 | 5 | 6 | null;
  p?: boolean | 1 | 2 | null;
  display?: 1 | 2 | 3 | 4 | null;
  headline?: boolean;
  title?: boolean;
  subheading?: boolean | 1 | 2 | null;
  caption?: boolean;
  children?: React.ReactNode | ((props: ITextChildrenFunction) => React.ReactNode | null);
}

export interface ITextState {
  Component: React.ReactType | null;
}

/**
 * A utility function to get the html tag the Text component should render as.
 * By default, the component will attempt to render just as a text string if there
 * are no styling requirements provided. Otherwise, it will attempt to render as
 * the provided `type` or some auto-logic for determinine what html tag should be
 * used for styling.
 *
 * When the component should be rendered as text, null will be returned. Otherwise
 * the string html tag name will be returned.
 */
function getComponent(props: ITextProps): string | null {
  const {
    type,
    weight,
    decoration,
    display,
    headline,
    title,
    subheading,
    caption,
    p,
    h,
    align,
  } = props;

  if (type) {
    return type;
  } else if (display || headline) {
    return "h1";
  } else if (title) {
    return "h2";
  } else if (subheading) {
    return subheading === true || subheading === 1 ? "h4" : "h3";
  } else if (p) {
    return p === true || p === 1 ? "p" : "aside";
  } else if (caption) {
    return "caption";
  } else if (h) {
    return `h${h}`;
  } else if (weight || decoration || align) {
    return "span";
  }

  return null;
}

export default class Text extends React.Component<ITextProps, ITextState> {
  public static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    type: PropTypes.oneOf([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "section",
      "aside",
      "caption",
      "p",
      "span",
    ]),
    align: PropTypes.oneOf([
      "left",
      "center",
      "right",
      "justify",
      "inherit",
      "initial",
    ]),
    decoration: PropTypes.oneOf([
      "overline",
      "underline",
      "line-through",
      "none",
      "initial",
      "inherit",
    ]),
    weight: PropTypes.oneOf([
      "light",
      "regular",
      "medium",
      "semibold",
      "bold",
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
      type,
      weight,
      decoration,
      h,
      p,
      title,
      subheading,
      display,
      align,
      caption,
      headline,
      ...props,
    } = this.props;

    const className = cn("md-typography", {
      [`md-typography--${align}`]: !!align,
      [`md-typography--${weight}`]: !!weight,
      [`md-typography--${decoration}`]: !!decoration,
      [`md-typography--display-${display}`]: !!display,
      "md-typography--headline": headline,
      "md-typography--title": title,
      "md-typography--subheading-1": subheading === true || subheading === 1,
      "md-typography--subheading-2": subheading === 2,
      "md-typography--body-1": p === 1 || p === true,
      "md-typography--body-2": p === 2,
      "md-typography--caption": caption,
    }, propClassName);

    if (typeof children === "function") {
      return children({ className });
    } else if (!Component) {
      return children;
    }

    return React.createElement(Component, { ...props, className }, children);
  }
}
