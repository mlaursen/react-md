import * as React from "react";
import * as PropTypes from "prop-types";
import cn from "classnames";

export interface ITextIconSpacingProps {
  /**
   * An optional icon to display with a text button. This is invalid for icon buttons. If this is
   * a single element, a new class name will be cloned into the element to get correct spacing so
   * if you have a custom icon element, you **must** also pass that class name down. If you are using
   * one of the react-md icon component packages, this is handled automatically.
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
}

export interface ITextIconSpacingDefaultProps {
  iconAfter: boolean;
}

export type TextIconSpacingWithDefaultProps = ITextIconSpacingProps & ITextIconSpacingDefaultProps;

export default class TextIconSpacing extends React.Component<ITextIconSpacingProps, {}> {
  public static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    iconAfter: PropTypes.bool,
    children: PropTypes.node,
  };

  public static defaultProps: ITextIconSpacingDefaultProps = {
    iconAfter: false,
  };

  public render() {
    const { icon: propIcon, iconAfter, children } = this.props;

    if (!propIcon) {
      return children;
    }

    let iconEl = propIcon;
    let content = children;
    if (React.isValidElement(propIcon)) {
      const icon = React.Children.only(propIcon);
      iconEl = React.cloneElement(icon, {
        className: cn(
          {
            "rmd-icon--before": !iconAfter,
            "rmd-icon--after": iconAfter,
          },
          icon.props.className
        ),
      });
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
