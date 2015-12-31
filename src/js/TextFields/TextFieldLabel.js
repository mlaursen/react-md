import React from 'react';
import classnames from 'classnames';

export default ({ active, value, isError, label, required }) => {
  if(required && label.indexOf('*') === -1) {
    label = label.trim() + ' *';
  }

  return (
    <span
      className={classnames('md-text-field-label', {
        'active': active || !!value,
        'focus': active,
        'error': isError,
      })}>
      {label}
    </span>
  );
};
