import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';

/**
 * The `TextFieldMessage` component is used for rendering a help or error text message
 * under a `TextField`. It can also be used to display a counter of remaining characters.
 */
export default class TextFieldMessage extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    message: PropTypes.string,
    maxLength: PropTypes.number,
    error: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    helpOnFocus: PropTypes.bool,
    className: PropTypes.string,
  };

  render() {
    const { value, message, maxLength, error, active, helpOnFocus, className } = this.props;
    const isMessageVisible = !!message && (!helpOnFocus || active);

    let counter;
    if (maxLength) {
      counter = (
        <span className="md-text-field-counter">
          {`${value.length} / ${maxLength}`}
        </span>
      );
    }

    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        className={cn('md-text-field-message', className, {
          error,
          'count-only': !message || !isMessageVisible,
        })}
      >
        {isMessageVisible && <span key="message">{message}</span>}
        {counter}
      </CSSTransitionGroup>
    );
  }
}
