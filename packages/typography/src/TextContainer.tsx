import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export type TextContainerTagName = "div" | "section" | "article" | "aside";
export type TextContainerSize = "auto" | "mobile" | "desktop";

export interface ITextContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size for the text container. This can usually just be left at the default of `"auto"` since
   * it will automatically transition between `"mobile"` and `"desktop"` based on media queries.
   * However, you can also manually specify `"mobile"` or `"desktop"` if needed.
   */
  size?: TextContainerSize;

  /**
   * The specific tagName to render as.
   */
  tagName?: TextContainerTagName;
}

export interface ITextContainerDefaultProps {
  size: TextContainerSize;
  tagName: TextContainerTagName;
}

export type TextContainerWithDefaultProps = ITextContainerProps & ITextContainerDefaultProps;

/**
 * The `TextContainer` component is a simple wrapper around a `<div>`, `<section>`, `<article>`, or `<aside>`
 * element that applies the text container styles.
 */
export default class TextContainer extends React.Component<ITextContainerProps> {
  public static propTypes = {
    tagName: PropTypes.oneOf(["div", "section", "article", "aside"]),
    size: PropTypes.oneOf(["auto", "mobile", "desktop"]),
  };

  public static defaultProps = {
    tagName: "div",
    size: "auto",
  } as ITextContainerDefaultProps;

  public render() {
    const { size, tagName, className: propClassName, children, ...props } = this
      .props as TextContainerWithDefaultProps;

    const className = cn(
      {
        "rmd-text-container": size === "auto",
        "rmd-mobile-text-container": size === "mobile",
        "rmd-desktop-text-container": size === "desktop",
      },
      propClassName
    );

    return React.createElement(
      tagName,
      {
        ...props,
        className,
      },
      children
    );
  }
}
