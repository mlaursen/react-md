import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class ThumbDisabledMask extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
  };

  render() {
    const { style, className, thumbLeft, disabled, ...props } = this.props;
    if (!disabled) {
      return null;
    }

    return (
      <span
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-thumb md-slider-thumb--disabled-mask', className)}
      />
    );
  }
}
