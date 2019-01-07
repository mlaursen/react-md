import * as React from "react";
import cn from "classnames";

export interface IIconRotatorBaseProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap` prop is enabled
   * or the children is not a single react element.
   */
  style?: React.CSSProperties;

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
  children: React.ReactElement<any> | React.ReactNode;
}

export interface IIconRotatorDefaultProps {
  animate: boolean;
  forceIconWrap: boolean;
}

export type IconRotatorWithForwardedRef = {
  forwardedRef?: React.Ref<HTMLSpanElement>;
};

export type IconRotatorWithDefaultProps = IIconRotatorProps &
  IIconRotatorDefaultProps &
  IconRotatorWithForwardedRef;

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a one degrees
 * to another.
 */
const IconRotator: React.FunctionComponent<
  IIconRotatorProps & IconRotatorWithForwardedRef
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

  if (!forceIconWrap && React.isValidElement(children)) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: cn(className, child.props.className),
    });
  }

  return (
    <span style={style} className={className} ref={forwardedRef} {...props}>
      {children}
    </span>
  );
};

const defaultProps: IIconRotatorDefaultProps = {
  animate: true,
  forceIconWrap: false,
};

IconRotator.defaultProps = defaultProps;

export default React.forwardRef<HTMLSpanElement, IIconRotatorProps>(
  (props, ref) => <IconRotator {...props} forwardedRef={ref} />
);
