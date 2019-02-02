import React, {
  cloneElement,
  isValidElement,
  forwardRef,
  Children,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
  ReactElement,
} from "react";
import cn from "classnames";
import { IWithForwardedRef } from "@react-md/utils";

export interface IIconRotatorBaseProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap` prop is enabled
   * or the children is not a single react element.
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
   * Boolean if the child icon should be "forcefully" wrapped in a `<span>` element. This should
   * be enabled if you have a custom icon that does not pass the `className` prop down.
   */
  forceIconWrap?: boolean;
}

export interface IIconRotatorProps extends IIconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the class names will be
   * cloned into that icon, otherwise the icon will be wrapped in a span with the correct class
   * names applied.
   */
  children: ReactNode;
}

export interface IIconRotatorDefaultProps {
  animate: boolean;
  forceIconWrap: boolean;
}

export type IconRotatorWithDefaultProps = IIconRotatorProps &
  IIconRotatorDefaultProps &
  IWithForwardedRef<HTMLSpanElement>;

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a one degrees
 * to another.
 */
const IconRotator: FunctionComponent<
  IIconRotatorProps & IWithForwardedRef<HTMLSpanElement>
> = providedProps => {
  const {
    style,
    className: propClassName,
    animate,
    rotated,
    children,
    forceIconWrap,
    forwardedRef,
    ...props
  } = providedProps as IconRotatorWithDefaultProps;

  const className = cn(
    "rmd-icon-rotator",
    {
      "rmd-icon-rotator--animate": animate,
      "rmd-icon-rotator--rotated": rotated,
    },
    propClassName
  );

  if (!forceIconWrap && isValidElement(children)) {
    const child: ReactElement<{ className?: string }> = Children.only(children);
    return cloneElement(child, {
      className: cn(className, child.props.className),
    });
  }

  return (
    <span {...props} style={style} className={className} ref={forwardedRef}>
      {children}
    </span>
  );
};

const defaultProps: IIconRotatorDefaultProps = {
  animate: true,
  forceIconWrap: false,
};

IconRotator.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  let PropTypes = null;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    IconRotator.propTypes = {
      className: PropTypes.string,
      animate: PropTypes.bool,
      rotated: PropTypes.bool,
      forceIconWrap: PropTypes.bool,
      children: PropTypes.node,
    };
  }
}

export default forwardRef<HTMLSpanElement, IIconRotatorProps>((props, ref) => (
  <IconRotator {...props} forwardedRef={ref} />
));
