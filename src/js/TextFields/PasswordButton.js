import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import FontIcon from '../FontIcons';

export default class PasswordButton extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    passwordVisible: PropTypes.bool,
    iconClassName: PropTypes.string,
    iconChildren: PropTypes.node,
  };

  render() {
    const { active, passwordVisible, iconClassName, iconChildren, ...props } = this.props;

    return (
      <button
        {...props}
        type="button"
        className={cn('md-password-btn md-pointer--hover', {
          'md-password-btn--active': active,
          'md-password-btn--invisible': active && !passwordVisible,
        })}
      >
        <FontIcon iconClassName={iconClassName} children={iconChildren} />
      </button>
    );
  }
}
