import React, {
  ElementType,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { cnb } from "cnbuilder";

/**
 * A union of the available text container sizes. One of these values must be
 * chosen to help set the max width for text.
 */
export type TextContainerSize = "auto" | "mobile" | "desktop";

/**
 * A type describing the text container's children render function. It provides
 * an object containing the correct (and merged) className and exects a
 * renderable element to be returned.
 */
export type TextContainerRenderFunction = (props: {
  className: string;
}) => ReactElement;

/**
 * The base props for rendering the text component.
 */
export interface TextContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional className to merge with typography text container styles.
   */
  className?: string;

  /**
   * The size for the text container. This can usually just be left at the
   * default of `"auto"` since it will automatically transition between
   * `"mobile"` and `"desktop"` based on media queries.  However, you can also
   * manually specify `"mobile"` or `"desktop"` if needed.
   */
  size?: TextContainerSize;

  /**
   * The component to render as. By default this will just be a div, but
   * anything can be provided.
   */
  component?: ElementType;

  /**
   * Either a child render function or a react node. If this is not the child
   * render function, a different wrapper component can be provided using the
   * `component` prop.
   */
  children?: ReactNode | TextContainerRenderFunction;
}

function TextContainer(
  {
    className: propClassName,
    component: Component = "div",
    size = "auto",
    children,
    ...props
  }: TextContainerProps,
  ref?: Ref<HTMLDivElement | ElementType>
): ReactElement {
  const className = cnb(
    `rmd-text-container rmd-text-container--${size}`,
    propClassName
  );
  if (typeof children === "function") {
    return (children as TextContainerRenderFunction)({ className });
  }

  return (
    <Component {...props} className={className} ref={ref}>
      {children}
    </Component>
  );
}

const ForwardedTextContainer = forwardRef<
  HTMLDivElement | ElementType,
  TextContainerProps
>(TextContainer);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTextContainer.propTypes = {
      className: PropTypes.string,
      size: PropTypes.oneOf(["auto", "mobile", "desktop"]),
      component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.object,
      ]),
      children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    };
  } catch (e) {}
}

export default ForwardedTextContainer;
