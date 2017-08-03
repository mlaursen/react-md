import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-md/lib/Badges';
import Button from 'react-md/lib/Buttons/Button';

import NotificationDialog from './NotificationDialog';

export default class BadgeWithDialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onDismiss: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
  };

  state = { visible: false };

  componentDidMount() {
    this.badge = document.getElementById('notification-badge-toggle');
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.state;
    if (visible === prevState.visible) {
      return;
    }

    window[`${visible ? 'add' : 'remove'}EventListener`]('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  toggleDialog = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleOutsideClick = (e) => {
    if (!this.badge || !this.badge.contains(e.target)) {
      this.setState({ visible: false });
    }
  };

  render() {
    const { visible } = this.state;
    const { notifications, className, onDismiss } = this.props;
    return (
      <Badge
        id="notification-badge-toggle"
        className={className}
        secondary
        aria-haspopup
        badgeId="notification-badge"
        badgeContent={notifications.length}
      >
        <Button icon onClick={this.toggleDialog} aria-describedby="notification-badge">
          notifications
        </Button>
        <NotificationDialog visible={visible} onDismiss={onDismiss} notifications={notifications} />
      </Badge>
    );
  }
}
