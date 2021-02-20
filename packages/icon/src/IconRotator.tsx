import React, {
  Children,
  cloneElement,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";
import cn from "classnames";
import { bem, ClassNameCloneableChild } from "@react-md/utils";

export interface IconRotatorBaseProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap`
   * prop is enabled or the children is not a single react element.
   */
  style?: CSSProperties;

  /**
   * An optional className to apply.
   */
  className?: string;

  /**
   * Boolean if the rotation should be animated instead of static.
   */
  animate?: boolean;

  /**
   * Boolean if the icon is currently rotated.
   */
  rotated: boolean;

  /**
   * Boolean if the child icon should be "forcefully" wrapped in a `<span>`
   * element. This should be enabled if you have a custom icon that does not
   * pass the `className` prop down.
   */
  forceIconWrap?: boolean;
}

export interface IconRotatorProps extends IconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the
   * class names will be cloned into that icon, otherwise the icon will be
   * wrapped in a span with the correct class names applied.
   */
  children: ReactNode;
}

const block = bem("rmd-icon-rotator");

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a
 * one degrees to another.
 */
export const IconRotator = forwardRef<HTMLSpanElement, IconRotatorProps>(
  function IconRotator(
    {
      style,
      className: propClassName,
      animate = true,
      rotated,
      children,
      forceIconWrap = false,
      ...props
    },
    ref
  ) {
    const className = cn(block({ animate, rotated }), propClassName);
    if (!forceIconWrap && isValidElement(children)) {
      const child = Children.only<ClassNameCloneableChild>(children);
      return cloneElement(child, {
        className: cn(className, child.props.className),
      });
    }

    return (
      <span {...props} style={style} className={className} ref={ref}>
        {children}
      </span>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    IconRotator.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      animate: PropTypes.bool,
      rotated: PropTypes.bool,
      forceIconWrap: PropTypes.bool,
      children: PropTypes.node,
    };
  } catch (e) {}
}
