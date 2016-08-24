import React, { PropTypes } from 'react';
import cn from 'classnames';

import SliderThumb from './SliderThumb';

const SliderTrack = ({ width, onClick, ...props }) => (
  <div
    className="md-slider-track"
    onClick={onClick}
  >
    <span
      className={cn('md-track-fill', {
        'dragging': props.dragging,
        'discrete': props.discrete,
      })}
      style={{ width: `${width}%` }}
    />
    <SliderThumb {...props} />
  </div>
);

SliderTrack.propTypes = {
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  valued: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  dragging: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  discrete: PropTypes.bool,
};

export default SliderTrack;
