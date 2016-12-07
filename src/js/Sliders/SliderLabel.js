import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

/**
 * This is just the label component for the slider. It will
 * return null if there are no children to display.
 */
export default class SliderLabel extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    htmlFor: (props, propName, component, ...others) => {
      if (typeof props.children === 'undefined') {
        return null;
      }

      return PropTypes.string.isRequired(props, propName, component, ...others);
    },
  };

  render() {
    const { children, className, htmlFor, ...props } = this.props;
    if (!children) {
      return null;
    }

    return (
      <label
        {...props}
        htmlFor={htmlFor}
        className={cn('md-slider-label md-text', className)}
      >
        {children}
      </label>
    );
  }
}
