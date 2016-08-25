import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class ThumbMask extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
    maskInked: PropTypes.bool,
    dragging: PropTypes.bool,
  };

  render() {
    const { style, className, thumbLeft, disabled, dragging, maskInked, ...props } = this.props;

    return (
      <span
        {...props}
        style={Object.assign({}, style, { left: thumbLeft })}
        className={cn('md-slider-thumb md-slider-thumb--mask', className, {
          'md-slider-thumb--dragging': dragging,
          'md-slider-thumb--mask-inked': maskInked,
          'md-slider-thumb--mask-disabled': disabled,
        })}
      />
    );
  }
}
