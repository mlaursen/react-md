import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

export default ({ value, text, maxLength, isError, active, isHelpOnFocus }) => {
  const isTextVisible = !!text && (!isHelpOnFocus || active);
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="opacity"
      transitionEnterTimeout={150}
      transitionLeaveTimeout={150}
      className={classnames('md-text-field-info', {
        'error': isError,
        'count-only': !text || !(isTextVisible),
      })}
      >
      {isTextVisible && <span key="text">{text}</span>}
      {maxLength &&
        <span className="md-text-field-count">
          {value.length + ' / ' + maxLength}
        </span>
      }
    </CSSTransitionGroup>
  );
};
