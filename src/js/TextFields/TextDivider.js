import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextDivider = ({ lineDirection, active, error, icon }) => {
  return (
    <div
      className={classnames('md-text-divider', `from-${lineDirection}`, {
        active,
        error,
        'icon-offset': icon,
      })}
    />
  );
};

TextDivider.propTypes = {
  lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  icon: PropTypes.bool.isRequired,
};

export default TextDivider;
