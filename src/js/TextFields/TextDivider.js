import React, { PropTypes } from 'react';
import classnames from 'classnames';

const TextDivider = ({ lineDirection, active, error }) => {
  return (
    <div
      className={classnames('md-text-divider', `from-${lineDirection}`, {
        active,
        error,
      })}
    />
  );
};

TextDivider.propTypes = {
  lineDirection: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

export default TextDivider;
