import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface ITextIconSpacingProps {
  /**
   * An optional className to apply to the surroudning `<span>` when the `forceIconWrap` prop is enabled
   * or the icon is not a valid React Element.
   *
   * @docgen
   */
  className?: string;

  /**
   * An optional icon to display with a text button. This is invalid for icon buttons. If this is
   * a single element, a new class name will be cloned into the element to get correct spacing so
   * if you have a custom icon element, you **must** also pass that class name down. If you are using
   * one of the react-md icon component packages, this is handled automatically.
   *
   * If this is not a valid react element, the icon will be wrapped in a `<span>` instead
   * with the class names applied.
   *
   * @docgen
   */
  icon?: React.ReactElement<Element> | React.ReactNode;

  /**
   * Boolean if the icon should appear after the text instead of before.
   *
   * @docgen
   */
  iconAfter?: boolean;

  /**
   * The children to render before or after the provided icon.
   *
   * @docgen
   */
  children?: React.ReactNode;

  /**
   * The class name to use for an icon that is placed before text.
   *
   * @docgen
   */
  beforeClassName?: string;

  /**
   * The class name to use for an icon that is placed after text.
   *
   * @docgen
   */
  afterClassName?: string;

  /**
   * Boolean if the icon should be forced into a `<span>` with the class names applied instead of attempting
   * to clone into the provided icon.
   *
   * @docgen
   */
  forceIconWrap?: boolean;
}

export interface ITextIconSpacingDefaultProps {
  iconAfter: boolean;
  beforeClassName: string;
  afterClassName: string;
  forceIconWrap: boolean;
}

export type TextIconSpacingWithDefaultProps = ITextIconSpacingProps & ITextIconSpacingDefaultProps;

export default class TextIconSpacing extends React.Component<ITextIconSpacingProps, {}> {
  public static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    iconAfter: PropTypes.bool,
    beforeClassName: PropTypes.string,
    afterClassName: PropTypes.string,
    forceIconWrap: PropTypes.bool,
    children: PropTypes.node,
  };

  public static defaultProps: ITextIconSpacingDefaultProps = {
    iconAfter: false,
    forceIconWrap: false,
    beforeClassName: "rmd-icon--before",
    afterClassName: "rmd-icon--after",
  };

  public render() {
    const {
      icon: propIcon,
      iconAfter,
      children,
      className,
      beforeClassName,
      afterClassName,
      forceIconWrap,
    } = this.props as TextIconSpacingWithDefaultProps;

    if (!propIcon) {
      return children;
    }

    let iconEl = propIcon;
    let content = children;
    if (!forceIconWrap && React.isValidElement(propIcon)) {
      const icon = React.Children.only(propIcon);
      iconEl = React.cloneElement(icon, {
        className: cn(
          {
            [beforeClassName]: !iconAfter,
            [afterClassName]: iconAfter,
          },
          icon.props.className
        ),
      });
    } else if (propIcon) {
      iconEl = (
        <span
          className={cn("rmd-text-icon-spacing", {
            [beforeClassName]: !iconAfter,
            [afterClassName]: iconAfter,
          }, className)}
        >
          {propIcon}
        </span>
      );
    }

    if (iconEl) {
      content = (
        <React.Fragment>
          {!iconAfter && iconEl}
          {children}
          {iconAfter && iconEl}
        </React.Fragment>
      );
    }

    return content;
  }
}
