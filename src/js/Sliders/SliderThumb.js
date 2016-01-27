import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { IconButton } from '../Buttons';

const SliderThumb = ({ active, valued, left, ...props }) => {
  return (
    <IconButton
      {...props}
      style={{ left }}
      className={classnames('md-slider-thumb', { active, valued })}
    >
      radio_button_unchecked
    </IconButton>
  );
};

SliderThumb.propTypes = {
  onTouchStart: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  left: PropTypes.string,
  active: PropTypes.bool.isRequired,
  valued: PropTypes.bool.isRequired,
};

export default SliderThumb;
