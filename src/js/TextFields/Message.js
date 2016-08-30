import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

export default class Message extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.bool,
    helpText: PropTypes.string,
    errorText: PropTypes.string,
    active: PropTypes.bool,
    helpOnFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    currentLength: PropTypes.number,
    leftIcon: PropTypes.bool,
    rightIcon: PropTypes.bool,
    block: PropTypes.bool,
  };

  constructor(props) {
    super(props);


    const isMessageVisible = this._isMessageVisible(props);
    this.state = {
      message: (props.error && props.errorText) || props.helpText,
      isMessageVisible,
      messageClassName: `md-text-field-message--${isMessageVisible ? '' : 'in'}active`,
    };
  }

  componentWillReceiveProps(nextProps) {
    const keys = ['active', 'error', 'helpOnFocus', 'helpText', 'errorText'];
    if (this._anyChanges(keys, this.props, nextProps)) {
      const isMessageVisible = this._isMessageVisible(nextProps);

      this.setState({
        isMessageVisible,
        messageClassName: `md-text-field-message--${isMessageVisible ? '' : 'in'}active`,
        message: (nextProps.error && nextProps.errorText) || nextProps.helpText,
      });
    }
  }

  _anyChanges(keys, p1, p2) {
    let changed = false;
    keys.some(key => {
      if (p1[key] !== p2[key]) {
        changed = true;
      }

      return changed;
    });

    return changed;
  }

  _isMessageVisible(props) {
    const { error, errorText, helpText, helpOnFocus, active } = props;
    return ((error && errorText) || !!helpText) && (!helpOnFocus || active);
  }

  render() {
    const {
      maxLength,
      error,
      className,
      errorText,
      helpText,
      currentLength,
      leftIcon,
      rightIcon,
      block,
    } = this.props;
    const { isMessageVisible, messageClassName, message } = this.state;

    if (!helpText && !errorText && typeof maxLength === 'undefined') {
      return null;
    }

    let counter;
    if (maxLength) {
      counter = (
        <span className="md-text-field-counter">
          {`${currentLength} /  ${maxLength}`}
        </span>
      );
    }

    let messageNode = message;
    if (message) {
      messageNode = (
        <span className={cn('md-text-field-message', messageClassName)}>{message}</span>
      );
    }

    return (
      <div
        className={cn('md-text-field-message-container', {
          'md-text-field-message-container--error': error,
          'md-text-field-message-container--count-only': !message || !isMessageVisible,
          'md-text-field-message-container--left-icon-offset': leftIcon,
          'md-text-field-message-container--right-icon-offset': rightIcon,
          'md-text-field-message-container--full-width': !block,
        }, className)}
      >
        {messageNode}
        {counter}
      </div>
    );
  }
}
