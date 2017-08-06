import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import themeColors from '../utils/themeColors';
import FontIcon from '../FontIcons/FontIcon';

export default class PasswordButton extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    passwordVisible: PropTypes.bool,
    icon: PropTypes.element,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.node,
    block: PropTypes.bool,
    floating: PropTypes.bool,
  };

  state = { keyboardFocus: false };

  _handleOutsideClick = (e) => {
    if (this._button && !this._button.contains(e.target)) {
      window.removeEventListener('click', this._handleOutsideClick);
      this.setState({ keyboardFocus: false });
    }
  };

  _handleBlur = () => {
    if (this.state.keyboardFocus) {
      this.setState({ keyboardFocus: false });
    }
  };

  _handleKeyUp = (e) => {
    const key = e.which || e.keyCode;
    if (key === TAB) {
      this.setState({ keyboardFocus: true });
    }
  };

  render() {
    const { keyboardFocus } = this.state;
    const {
      active,
      passwordVisible,
      block,
      floating,
      icon: propIcon, // eslint-disable-line no-unused-vars

      // deprecated
      iconClassName,
      iconChildren,
      ...props
    } = this.props;
    let { icon } = this.props;
    if (iconClassName || iconChildren) {
      icon = <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>;
    }

    return (
      <button
        {...props}
        onBlur={this._handleBlur}
        onKeyUp={this._handleKeyUp}
        type="button"
        className={cn('md-text-field-inline-indicator md-password-btn md-pointer--hover', {
          'md-password-btn--focus': keyboardFocus,
          'md-password-btn--invisible': active && !passwordVisible,
          'md-text-field-inline-indicator--floating': floating,
          'md-text-field-inline-indicator--block': block,
        }, themeColors({ disabled: !active, hint: active }))}
      >
        {icon}
      </button>
    );
  }
}
