import React, { PropTypes } from 'react';
import classnames from 'classnames';

const SliderThumb = ({ active, value, valued, left, dragging, discrete, ...props }) => {
  return (
    <div
      className={classnames('md-slider-thumb', {
        active,
        valued,
        dragging,
        'zeroed': !valued,
        'md-discrete-slider-thumb': discrete,
        'md-continuous-slider-thumb': !discrete,
      })}
      style={{ left }}
    >
      <button {...props} className="md-thumb-control">
        {discrete && active &&
          <span className="md-slider-discrete-value">{value}</span>
        }
      </button>
    </div>
  );
};

SliderThumb.propTypes = {
  onTouchStart: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  left: PropTypes.string,
  active: PropTypes.bool.isRequired,
  valued: PropTypes.bool.isRequired,
  dragging: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  discrete: PropTypes.bool,
};

export default SliderThumb;
