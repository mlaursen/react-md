import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
    closeIcon: PropTypes.element,
    onCloseClick: PropTypes.func,
  };

  _handleClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    if (this.context.onCloseClick) {
      this.context.onCloseClick(e);
    }
  };

  render() {
    const { closeIcon } = this.context;

    return (
      <Button
        {...this.props}
        icon
        key="close"
        onClick={this._handleClick}
        iconEl={closeIcon}
      />
    );
  }
}
