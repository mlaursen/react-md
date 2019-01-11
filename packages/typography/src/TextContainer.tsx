import * as React from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

/**
 * A union of the available text container sizes. One of these values must be chosen
 * to help set the max width for text.
 */
export type TextContainerSize = "auto" | "mobile" | "desktop";

/**
 * A type describing the text container's children render function. It provides an object containing
 * the correct (and merged) className and exects a renderable element to be returned.
 */
export type TextContainerRenderFunction = (
  props: { className: string }
) => React.ReactElement<any>;

/**
 * The base props for rendering the text component.
 */
export interface ITextContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An optional className to merge with typography text container styles.
   */
  className?: string;

  /**
   * The size for the text container. This can usually just be left at the default of `"auto"` since
   * it will automatically transition between `"mobile"` and `"desktop"` based on media queries.
   * However, you can also manually specify `"mobile"` or `"desktop"` if needed.
   */
  size?: TextContainerSize;

  /**
   * The component to render as. By default this will just be a div, but anything can be provided.
   */
  component?: React.ReactType;

  /**
   * Either a child render function or a react node. If this is not the child render function, a
   * different wrapper component can be provided using the `component` prop.
   */
  children?: React.ReactNode | TextContainerRenderFunction;
}

/**
 * The default defined props for the text container component.
 */
export interface ITextContainerDefaultProps {
  size: TextContainerSize;
  component: React.ReactType;
}

export type TextContainerWithDefaultProps = ITextContainerProps &
  ITextContainerDefaultProps &
  IWithForwardedRef<HTMLDivElement | React.ReactType>;

const TextContainer: React.FunctionComponent<
  ITextContainerProps & IWithForwardedRef<HTMLDivElement | React.ReactType>
> = providedProps => {
  const {
    className: propClassName,
    component: Component,
    size,
    children,
    forwardedRef,
    ...props
  } = providedProps as TextContainerWithDefaultProps;

  const className = cn(
    `rmd-text-container rmd-text-container--${size}`,
    propClassName
  );
  if (typeof children === "function") {
    return (children as TextContainerRenderFunction)({ className });
  }

  return React.createElement(
    Component,
    { ...props, className, ref: forwardedRef },
    children
  );
};

const defaultProps: ITextContainerDefaultProps = {
  size: "auto",
  component: "div",
};

TextContainer.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TextContainer.propTypes = {
      className: PropTypes.string,
      size: PropTypes.oneOf(["auto", "mobile", "desktop"]),
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    };
  }
}

export default React.forwardRef<
  HTMLDivElement | React.ReactType,
  ITextContainerProps
>((props, ref) => <TextContainer {...props} forwardedRef={ref} />);
