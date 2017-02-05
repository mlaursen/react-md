import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import Badge from 'react-md/lib/Badges';
import Button from 'react-md/lib/Buttons/Button';
import Toolbar from 'react-md/lib/Toolbars';

import './_styles.scss';
import NotificationDialog from './NotificationDialog';
const unsplash = 'https://unsplash.it/100?image=';

const NOTIFICATIONS = [{
  image: `${unsplash}1027`,
  message: 'Emilia Kristensen shared an image with you.',
}, {
  image: `${unsplash}1025`,
  message: 'Scot Dixon did something amazing. Why don\'t you check it out?',
}, {
  image: `${unsplash}1011`,
  message: 'Candida Salomon went canoeing. Check out the pictures they uploaded!',
}, {
  image: `${unsplash}903`,
  message: 'You won\'t believe these 5 things about some random planet!',
}, {
  image: `${unsplash}883`,
  message: 'Clouds. Clouds. Clouds. I\'m out of dummy data ideas.',
}];

export default class ComplexExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { notifications: NOTIFICATIONS, collapsed: true };
  }

  componentDidUpdate(prevProps, prevState) {
    const { collapsed } = this.state;
    if (collapsed === prevState.collapsed) {
      return;
    }

    window[`${!collapsed ? 'add' : 'remove'}EventListener`]('click', this._closeDialog);
  }

  componentWillUnmount() {
    if (!this.state.collapsed) {
      window.removeEventListener('click', this._closeDialog);
    }
  }

  _reset = (e) => {
    const l = this.state.notifications.length;
    if (l !== NOTIFICATIONS.length) {
      // Don't propagate to close dialog listener
      e.stopPropagation();
      this.setState({ notifications: NOTIFICATIONS });
    }
  };

  _dismiss = (i) => {
    const notifications = this.state.notifications.slice();
    notifications.splice(i, 1);

    this.setState({ notifications });
  };

  _setBadge = (badge) => {
    this._badge = findDOMNode(badge);
  };

  _closeDialog = (e) => {
    if (this._badge && !this._badge.contains(e.target)) {
      this.setState({ collapsed: true });
    }
  };

  _toggleDialog = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { notifications, collapsed } = this.state;
    return (
      <div>
        <Button
          secondary
          label="Reset"
          type="reset"
          raised
          onClick={this._reset}
          ref={this._setReset}
          className="notification-reset-btn"
          aria-controls="example-notifications"
        />
        <Toolbar
          colored
          nav={<Button icon>menu</Button>}
          title="Example"
          actions={
            <Badge
              secondary
              aria-haspopup
              ref={this._setBadge}
              badgeId="example-notifications"
              badgeContent={notifications.length}
            >
              <Button icon onClick={this._toggleDialog} aria-describedby="example-notifications">notifications</Button>
              <NotificationDialog collapsed={collapsed} notifications={notifications} dismiss={this._dismiss} />
            </Badge>
          }
        />
      </div>
    );
  }
}
