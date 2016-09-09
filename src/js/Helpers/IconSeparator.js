import React, { PureComponent, PropTypes } from 'react';
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
  };

  render() {
    const { label, iconBefore, children, className, ...props } = this.props;
    return (
      <div {...props} className={cn('md-icon-separator', className)}>
        {iconBefore && children}
        <span className="md-icon-text">{label}</span>
        {!iconBefore && children}
      </div>
    );
  }
}
