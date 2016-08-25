import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

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
        className={cn('md-slider-label', className)}
      >
        {children}
      </label>
    );
  }
}
