import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import TrackFill from './TrackFill';
import Thumb from './Thumb';
import ThumbDisabledMask from './ThumbDisabledMask';

export default class Track extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    on: PropTypes.bool,
    off: PropTypes.bool,
    active: PropTypes.bool,
    dragging: PropTypes.bool,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
    trackFillWidth: PropTypes.string.isRequired,
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
      ...props,
    } = this.props;

    return (
      <div {...props} className={cn('md-slider-track', className)}>
        <TrackFill disabled={disabled} dragging={dragging} trackFillWidth={trackFillWidth} />
        <Thumb
          on={on}
          off={off}
          disabled={disabled}
          dragging={dragging}
          active={active}
          thumbLeft={thumbLeft}
        />
        <ThumbDisabledMask disabled={disabled} thumbLeft={thumbLeft} />
      </div>
    );
  }
}
