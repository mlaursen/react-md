import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const TextFieldMessage = ({ value, message, maxLength, error, active, helpOnFocus }) => {
  const isMessageVisible = !!message && (!helpOnFocus || active);
  return (
    <CSSTransitionGroup
      component="div"
      transitionName="opacity"
      transitionEnterTimeout={150}
      transitionLeaveTimeout={150}
      className={classnames('md-text-field-message', {
        error,
        'count-only': !message || !isMessageVisible,
      })}
    >
      {isMessageVisible && <span key="message">{message}</span>}
      {maxLength &&
      <span className="md-text-field-counter">
        {`${value.length} / ${maxLength}`}
      </span>
      }
    </CSSTransitionGroup>
  );
};

TextFieldMessage.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  message: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  helpOnFocus: PropTypes.bool.isRequired,
};

export default TextFieldMessage;
