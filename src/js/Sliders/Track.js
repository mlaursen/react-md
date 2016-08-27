import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import TrackFill from './TrackFill';
import Thumb from './Thumb';
import ThumbMask from './ThumbMask';
import DiscreteValue from './DiscreteValue';

/**
 * The `Track` component is used for showing the current state of the slider.
 * It will render the `TrackFill`, `Thumb`, and `ThumbMask` components.
 */
export default class Track extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    thumbStyle: PropTypes.object,
    thumbClassName: PropTypes.string,
    trackFillStyle: PropTypes.object,
    trackFillClassName: PropTypes.string,
    discreteValueStyle: PropTypes.object,
    discreteValueClassName: PropTypes.string,
    on: PropTypes.bool,
    off: PropTypes.bool,
    active: PropTypes.bool,
    dragging: PropTypes.bool,
    disabled: PropTypes.bool,
    thumbLeft: PropTypes.string.isRequired,
    trackFillWidth: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    discrete: PropTypes.bool,
    maskInked: PropTypes.bool,
    maskLeaving: PropTypes.bool,
    onThumbKeyUp: PropTypes.func.isRequired,
    onThumbKeyDown: PropTypes.func.isRequired,
    onThumbFocus: PropTypes.func.isRequired,
    scale: PropTypes.number,
    discreteTicks: PropTypes.number,
    tickWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
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
      discreteValueStyle,
      discreteValueClassName,
      maskInked,
      maskLeaving,
      thumbStyle,
      thumbClassName,
      discrete,
      onThumbFocus,
      onThumbKeyUp,
      onThumbKeyDown,
      value,
      tickWidth,
      discreteTicks,
      scale,
      ...props,
    } = this.props;

    const ticks = [];
    if (typeof discreteTicks !== 'undefined' && !disabled) {
      const amt = scale / discreteTicks;
      const offset = typeof tickWidth === 'number' ? `${tickWidth}px` : tickWidth;

      for (let i = 0; i <= amt; i++) {
        let left = `${i * discreteTicks}%`;
        let width;
        if (i === 0 || i === amt) {
          width = typeof tickWidth === 'number'
            ? tickWidth / 2
            : `${parseInt(tickWidth, 10)}${tickWidth.replace(/[0-9]/g, '')}`;
        }

        if (i !== 0 && i !== amt) {
          left = `calc(${left} - ${offset})`;
        }

        ticks.push(
          <span
            key={`tick-${i}`}
            className="md-slider-discrete-tick"
            style={{ left, width }}
          />
        );
      }
    }

    return (
      <div {...props} className={cn('md-slider-track', className)}>
        {ticks}
        <TrackFill
          style={trackFillStyle}
          className={trackFillClassName}
          disabled={disabled}
          dragging={dragging}
          trackFillWidth={trackFillWidth}
          off={off}
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
          discrete={discrete}
        />
        <DiscreteValue
          style={discreteValueStyle}
          className={discreteValueClassName}
          discrete={discrete}
          dragging={dragging}
          active={active}
          value={value}
          thumbLeft={thumbLeft}
        />
        <ThumbMask
          dragging={dragging}
          disabled={disabled}
          thumbLeft={thumbLeft}
          maskInked={maskInked}
          discrete={discrete}
          leaving={maskLeaving}
        />
      </div>
    );
  }
}
