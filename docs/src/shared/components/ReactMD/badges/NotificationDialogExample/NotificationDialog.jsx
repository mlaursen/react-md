import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import cn from 'classnames';
import Collapse from 'react-md/lib/Helpers/Collapse';
import { Dialog } from 'react-md/lib/Dialogs';
import Card from 'react-md/lib/Cards/Card';
import Media from 'react-md/lib/Media/Media';

import NoNotifications from './NoNotifications';
import CloseButton from './CloseButton';

export default class NotificationDialog extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({
      image: PropTypes.string.isRequired,
    })).isRequired,
    dismiss: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { displayEmpty: props.notifications.length === 0 };
  }

  componentWillReceiveProps(nextProps) {
    const len = this.props.notifications.length;
    const nLen = nextProps.notifications.length;
    if (len === 0 && nLen > 0) {
      this.setState({ displayEmpty: false });
      return;
    } else if (len === nLen || nLen !== 0) {
      return;
    }

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    // Wait for the all the notifications to be fully removed and then insert the
    // no notifications compoennt. Makes it look smoother to me. /shrug
    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ displayEmpty: true });
    }, 300);
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }


  render() {
    const { displayEmpty } = this.state;
    const { collapsed, notifications, dismiss } = this.props;

    let content;
    if (displayEmpty) {
      content = <NoNotifications key="no-notifications" />;
    } else {
      content = notifications.map(({ image, message }, i) => (
        <Card key={image} className="md-cell md-cell--12 notification-card">
          <div className="notification-image">
            <Media aspectRatio="1-1">
              <img src={image} role="presentation" />
            </Media>
          </div>
          <p>{message}</p>
          <CloseButton index={i} dismiss={dismiss} />
        </Card>
      ));
    }

    return (
      <Collapse collapsed={collapsed}>
        <Dialog
          id="complex-example"
          title="Notifications"
          autopadContent={false}
          className="notification-dialog md-background"
          contentClassName={cn({
            'md-grid': notifications.length > 0,
            'notification-dialog--empty': notifications.length === 0,
          })}
        >
          <CSSTransitionGroup transitionName="fade" transitionLeaveTimeout={150} transitionEnterTimeout={150}>
            {content}
          </CSSTransitionGroup>
        </Dialog>
      </Collapse>
    );
  }
}
