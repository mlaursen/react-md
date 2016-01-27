import React, { PropTypes } from 'react';

import SliderThumb from './SliderThumb';

const SliderTrack = ({ width, onClick, ...props }) => {
  return (
    <div
      className="md-slider-track"
      onClick={onClick}
    >
      <span className="md-track-fill" style={{ width: `${width}%` }} />
      <SliderThumb {...props} />
    </div>
  );
};

SliderTrack.propTypes = {
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  valued: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
};

export default SliderTrack;
