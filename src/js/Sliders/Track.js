import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import updateUnit from '../utils/NumberUtils/updateUnit';
import TrackFill from './TrackFill';
import Thumb from './Thumb';
import ThumbMask from './ThumbMask';
import DiscreteValue from './DiscreteValue';

const half = w => w / 2;

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
    step: PropTypes.number,
    discreteTicks: PropTypes.number,
    tickWidth: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    valuePrecision: PropTypes.number.isRequired,
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
      step,
      valuePrecision,
      ...props
    } = this.props;

    const ticks = [];
    if (typeof discreteTicks !== 'undefined' && !disabled && discrete) {
      const amt = scale / (discreteTicks / step);
      const offset = updateUnit(tickWidth, half, 'px');
      const inc = 100 / amt;

      for (let i = 0; i <= amt; i++) {
        let left = `${i * inc}%`;
        let width = tickWidth;
        if (i === 0 || i === amt) {
          width = updateUnit(tickWidth, half);
        } else {
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
          valuePrecision={valuePrecision}
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
