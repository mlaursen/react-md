import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class DiscreteValue extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    discrete: PropTypes.bool,
    dragging: PropTypes.bool,
    active: PropTypes.bool,
    value: PropTypes.number.isRequired,
    thumbLeft: PropTypes.string.isRequired,
  };

  render() {
    const {
      style,
      className,
      discrete,
      dragging,
      thumbLeft,
      active,
      value,
      ...props,
    } = this.props;

    if (!discrete || !active) {
      return null;
    }
    return (
      <span
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-discrete-value', className, {
          'md-slider-discrete-value--dragging': dragging,
        })}
      >
        {value}
      </span>
    );
  }
}
