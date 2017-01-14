import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import { TAB, SPACE, ENTER } from '../constants/keyCodes';
import FontIcon from '../FontIcons/FontIcon';

export default class PasswordButton extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    passwordVisible: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.node,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    block: PropTypes.bool,
    floating: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = { keyboardFocus: false };

    this._handleKeyUp = this._handleKeyUp.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  componentWillUnmount() {
    if (this.state.keyboardFocus) {
      window.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _handleOutsideClick(e) {
    if (this._button && !this._button.contains(e.target)) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ keyboardFocus: false });
    }
  }

  _handleKeyUp(e) {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(e);
    }

    if ((e.which || e.keyCode) === TAB) {
      window.addEventListener('click', this._handleOutsideClick);
      this.setState({ keyboardFocus: true });
    }
  }

  _handleKeyDown(e) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    const key = e.which || e.keyCode;
    if (key === TAB || key === ENTER || key === SPACE) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ keyboardFocus: false });
    }
  }

  render() {
    const { keyboardFocus } = this.state;
    const {
      active,
      passwordVisible,
      iconClassName,
      iconChildren,
      block,
      floating,
      ...props
    } = this.props;

    return (
      <button
        {...props}
        onKeyDown={this._handleKeyDown}
        onKeyUp={this._handleKeyUp}
        type="button"
        className={cn('md-text-field-inline-indicator md-password-btn md-pointer--hover', {
          'md-password-btn--focus': keyboardFocus,
          'md-password-btn--active': active,
          'md-password-btn--invisible': active && !passwordVisible,
          'md-text-field-inline-indicator--floating': floating,
          'md-text-field-inline-indicator--block': block,
        })}
      >
        <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>
      </button>
    );
  }
}
