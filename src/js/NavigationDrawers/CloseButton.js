import React, { PureComponent, PropTypes } from 'react';

import Button from '../Buttons/Button';

/**
 * A button used to close the persistent navigation drawer. The button will
 * be generated based on the `NavigationDrawer`'s `contextTypes`.
 *
 * This component is really only used if you are using a `persistent` drawer and you
 * manually created the `drawerHeader` for the `NavigationDrawer`.
 */
export default class CloseButton extends PureComponent {
  static propTypes = {
    /**
     * An optional className to apply.
     */
    className: PropTypes.string,

    /**
     * An optional additional function to call when the `click` event is triggered.
     */
    onClick: PropTypes.func,
  };

  static contextTypes = {
    closeIconClassName: PropTypes.string,
    closeChildren: PropTypes.node,
    onCloseClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.context.onCloseClick) {
      this.context.onCloseClick(e);
    }
  }

  render() {
    const {
      closeIconClassName: iconClassName,
      closeChildren: children,
    } = this.context;

    return (
      <Button
        {...this.props}
        icon
        key="close"
        iconClassName={iconClassName}
        onClick={this._handleClick}
      >
        {children}
      </Button>
    );
  }
}
