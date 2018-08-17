import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface IIconRotatorBaseProps {
  /**
   * An optional style to apply to the surrounding span when the `forceIconWrap` prop is enabled
   * or the children is not a single react element.
   *
   * @docgen
   */
  style?: React.CSSProperties;

  /**
   * An optional className to apply.
   *
   * @docgen
   */
  className?: string;

  /**
   * The starting degree amount that should be used. This should be one of the values in the
   * `$rmd-icon-rotator-rotation-degrees` list or a value specified when using the `rmd-icon-rotator-degrees`
   * mixin so that a valid class name can be applied.
   *
   * @docgen
   */
  from?: number;

  /**
   * The ending degree amount that should be used. This should be one of the values in the
   * `$rmd-icon-rotator-rotation-degrees` list or a value specified when using the `rmd-icon-rotator-degrees`
   * mixin so that a valid class name can be applied.
   *
   * @docgen
   */
  to?: number;

  /**
   * Boolean if the rotation should be animated instead of static.
   *
   * @docgen
   */
  animate?: boolean;

  /**
   * Boolean if the icon is currently rotated.
   *
   * @docgen
   */
  rotated: boolean;

  /**
   * Boolean if the child icon should be "forcefully" wrapped in a `<span>` element. This should be enabled if
   * you have a custom icon that does not pass the `className` prop down.
   *
   * @docgen
   */
  forceIconWrap?: boolean;
}

export interface IIconRotatorProps extends IIconRotatorBaseProps {
  /**
   * The icon that should be rotated. If this is a valid React Element, the class names will be cloned into
   * that icon, otherwise the icon will be wrapped in a span with the correct class names applied.
   *
   * @docgen
   */
  children: React.ReactElement<any> | React.ReactNode;
}

export interface IIconRotatorDefaultProps {
  from: number;
  to: number;
  animate: boolean;
  forceIconWrap: boolean;
}

export type IconRotatorWithDefaultProps = IIconRotatorProps & IIconRotatorDefaultProps;

/**
 * The `IconRotator` is a simple component that is used to rotate an icon from a one degrees
 * to another.
 */
const IconRotator: React.SFC<IIconRotatorProps> = props => {
  const {
    style,
    className: propClassName,
    from,
    to,
    animate,
    rotated,
    children,
    forceIconWrap,
  } = props as IconRotatorWithDefaultProps;

  const className = cn(
    "rmd-icon-rotator",
    {
      "rmd-icon-rotator--animate": animate,
      [`rmd-icon-rotator--rotated-${from}`]: !rotated,
      [`rmd-icon-rotator--rotated-${to}`]: rotated,
    },
    propClassName
  );

  if (!forceIconWrap && React.isValidElement(children)) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: cn(className, child.props.className),
    });
  }

  return <span style={style} className={className}>{children}</span>;
};

IconRotator.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  animate: PropTypes.bool,
  rotated: PropTypes.bool.isRequired,
  forceIconWrap: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};

IconRotator.defaultProps = {
  from: 0,
  to: 180,
  animate: true,
  forceIconWrap: false,
} as IIconRotatorDefaultProps;

export default IconRotator;
