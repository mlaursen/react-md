import React, { PureComponent, PropTypes, cloneElement, isValidElement, Children } from 'react';
import cn from 'classnames';

/**
 * The `IconSeparator` component is a simple helper component to render some text and
 * an icon with some space between them while centering the text. The icon can either
 * come before or after the text.
 */
export default class IconSeparator extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the label.
     */
    labelStyle: PropTypes.object,

    /**
     * An optional className to apply to the label.
     */
    labelClassName: PropTypes.string,

    /**
     * The label to display.
     */
    label: PropTypes.node.isRequired,

    /**
     * The icon to display.
     */
    children: PropTypes.node.isRequired,

    /**
     * Boolean if the icon should appear before or after the text
     */
    iconBefore: PropTypes.bool,

    /**
     * The component to be rendered as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    component: 'div',
  };

  render() {
    const {
      className,
      labelStyle,
      labelClassName,
      component,
      label,
      iconBefore,
      children,
      ...props
    } = this.props;

    let text;
    if (isValidElement(label)) {
      const labelProps = Children.only(label).props;
      text = cloneElement(label, {
        className: cn('md-icon-text', labelClassName, labelProps.className),
        style: { ...labelStyle, ...labelProps.style },
      });
    } else {
      text = <span style={labelStyle} className={cn('md-icon-text', labelClassName)}>{label}</span>;
    }

    const Component = component;

    return (
      <Component {...props} className={cn('md-icon-separator', className)}>
        {iconBefore && children}
        {text}
        {!iconBefore && children}
      </Component>
    );
  }
}
