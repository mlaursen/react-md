import React, { PureComponent, PropTypes } from 'react';

import Button from '../Buttons/Button';

export default class CloseButton extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static contextTypes = {
    closeIconClassName: PropTypes.string,
    closeChildren: PropTypes.node,
    onCloseClick: PropTypes.func,
  };

  render() {
    const {
      closeIconClassName: iconClassName,
      closeChildren: children,
      onCloseClick: onClick,
    } = this.context;

    return (
      <Button
        {...this.props}
        icon
        key="close"
        iconClassName={iconClassName}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }
}
