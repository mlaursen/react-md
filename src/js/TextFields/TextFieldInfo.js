import React from 'react';
import classnames from 'classnames';

export default ({ value, text, maxLength, isError, active, isHelpOnFocus }) => {
  return (
    <div className={classnames('md-text-field-info', { 'error': isError })}>
      {(!isHelpOnFocus || active) && text}
      {maxLength &&
        <span className="md-text-field-count">
          {value.length + ' / ' + maxLength}
        </span>
      }
    </div>
  );
};
