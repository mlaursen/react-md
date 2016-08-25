import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import TrackFill from './TrackFill';
import Thumb from './Thumb';
import ThumbMask from './ThumbMask';

export default class Track extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    thumbStyle: PropTypes.object,
    thumbClassName: PropTypes.string,
    trackFillStyle: PropTypes.object,
    trackFillClassName: PropTypes.string,
    on: PropTypes.bool,
    off: PropTypes.bool,
    active: PropTypes.bool,
    dragging: PropTypes.bool,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
    trackFillWidth: PropTypes.string.isRequired,
    maskInked: PropTypes.bool,
    onThumbKeyUp: PropTypes.func.isRequired,
    onThumbKeyDown: PropTypes.func.isRequired,
    onThumbFocus: PropTypes.func.isRequired,
  };

  render() {
    const {
      on,
      off,
      active,
      disabled,
      dragging,
      className,
      thumbLeft,
      trackFillWidth,
      trackFillStyle,
      trackFillClassName,
      maskInked,
      thumbStyle,
      thumbClassName,
      onThumbFocus,
      onThumbKeyUp,
      onThumbKeyDown,
      ...props,
    } = this.props;

    return (
      <div {...props} className={cn('md-slider-track', className)}>
        <TrackFill
          style={trackFillStyle}
          className={trackFillClassName}
          disabled={disabled}
          dragging={dragging}
          trackFillWidth={trackFillWidth}
        />
        <Thumb
          style={thumbStyle}
          className={thumbClassName}
          on={on}
          off={off}
          disabled={disabled}
          dragging={dragging}
          active={active}
          thumbLeft={thumbLeft}
          onFocus={onThumbFocus}
          onKeyUp={onThumbKeyUp}
          onKeyDown={onThumbKeyDown}
        />
        <ThumbMask
          dragging={dragging}
          disabled={disabled}
          thumbLeft={thumbLeft}
          maskInked={maskInked}
        />
      </div>
    );
  }
}
