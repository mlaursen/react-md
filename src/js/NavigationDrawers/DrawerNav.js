import React, { PureComponent, PropTypes } from 'react';
import Button from '../Buttons/Button';

export default class DrawerNav extends PureComponent {
  static contextTypes = {
    navIconClassName: PropTypes.string,
    navChildren: PropTypes.node,
    navDisabled: PropTypes.bool,
    onNavClick: PropTypes.func,
  };

  render() {
    const {
      navIconClassName: iconClassName,
      navChildren: children,
      navDisabled: disabled,
      onNavClick: onClick,
    } = this.context;
    return (
      <Button
        {...this.props}
        key="nav"
        icon
        disabled={disabled}
        iconClassName={iconClassName}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
}
