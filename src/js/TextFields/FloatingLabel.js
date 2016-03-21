import React, { PropTypes } from 'react';
import classnames from 'classnames';

const FloatingLabel = ({ active, error, label, required, value }) => {
  if(required && label.indexOf('*') === -1) {
    label = label.trim() + ' *';
  }

  return (
    <span
      className={classnames('md-floating-label', {
        'active': active || !!value,
        'focus': active,
        error,
      })}
    >
      {label}
    </span>
  );
};

FloatingLabel.propTypes = {
  active: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default FloatingLabel;
