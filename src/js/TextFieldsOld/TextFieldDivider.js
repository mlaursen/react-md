import React from 'react';
import classnames from 'classnames';

export default ({ lineDirection, active, isError }) => {
  return (
    <div
      className={classnames('md-text-field-divider', `from-${lineDirection}`, {
        'active': active,
        'error': isError,
      })}
    />
  );
};
