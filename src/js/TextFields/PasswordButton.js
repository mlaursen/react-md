import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import FontIcon from '../FontIcons/FontIcon';

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
        className={cn('md-text-field-inline-indicator md-password-btn md-pointer--hover', {
          'md-password-btn--active': active,
          'md-password-btn--invisible': active && !passwordVisible,
        })}
      >
        <FontIcon iconClassName={iconClassName}>{iconChildren}</FontIcon>
      </button>
    );
  }
}
