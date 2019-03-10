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
import { WithForwardedRef } from "@react-md/utils";

export interface IconRotatorBaseProps extends HTMLAttributes<HTMLSpanElement> {
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

export interface IconRotatorProps extends IconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the class names will be
   * cloned into that icon, otherwise the icon will be wrapped in a span with the correct class
   * names applied.
   */
  children: ReactNode;
}

type WithRef = WithForwardedRef<HTMLSpanElement>;
type DefaultProps = Required<
  Pick<IconRotatorProps, "animate" | "forceIconWrap">
>;
type WithDefaultProps = IconRotatorProps & DefaultProps & WithRef;

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a one degrees
 * to another.
 */
const IconRotator: FunctionComponent<
  IconRotatorProps & WithRef
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
  } = providedProps as WithDefaultProps;

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

const defaultProps: DefaultProps = {
  animate: true,
  forceIconWrap: false,
};

IconRotator.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  IconRotator.displayName = "IconRotator";

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

export default forwardRef<HTMLSpanElement, IconRotatorProps>((props, ref) => (
  <IconRotator {...props} forwardedRef={ref} />
));
