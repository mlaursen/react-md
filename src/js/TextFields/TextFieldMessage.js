import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import Message from './Message';

export default class TextFieldMessage extends PureComponent {
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


    this.state = {
      message: (props.error && props.errorText) || props.helpText || props.errorText,
      isMessageVisible: this._isMessageVisible(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const keys = ['active', 'error', 'helpOnFocus', 'helpText', 'errorText'];
    if (this._anyChanges(keys, this.props, nextProps)) {
      this.setState({
        isMessageVisible: this._isMessageVisible(nextProps),
        message: (nextProps.error && nextProps.errorText) || nextProps.helpText || nextProps.errorText,
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
      active,
    } = this.props;
    const { isMessageVisible, message } = this.state;

    if (currentLength === 'undefined' || (!helpText && !errorText && !maxLength)) {
      return null;
    }

    return (
      <div
        className={cn('md-text-field-message-container', {
          'md-text-field-message-container--error': error,
          'md-text-field-message-container--count-only': !message || !isMessageVisible,
          'md-text-field-message-container--left-icon-offset': leftIcon,
          'md-text-field-message-container--right-icon-offset': rightIcon,
          'md-full-width': !block,
        }, className)}
      >
        <Message key="message" active={isMessageVisible}>{message}</Message>
        <Message key="counter" className="md-text-field-message--counter" active={active}>
          {maxLength ? `${currentLength} / ${maxLength}` : null}
        </Message>
      </div>
    );
  }
}
