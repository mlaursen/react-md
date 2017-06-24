import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import cn from 'classnames';
import Collapse from 'react-md/lib/Helpers/Collapse';
import { Dialog } from 'react-md/lib/Dialogs';

import NotificationCard from './NotificationCard';
import NoNotifications from './NoNotifications';

const NotificationDialog = ({ visible, onDismiss, notifications }) => {
  const empty = !notifications.length;

  let content;
  if (empty) {
    content = <NoNotifications />;
  } else {
    content = notifications.map((notification, i) => (
      <NotificationCard {...notification} key={notification.id} index={i} onDismiss={onDismiss} />
    ));
  }

  return (
    <Collapse collapsed={!visible}>
      <Dialog
        id="complex-example"
        title="Notifications"
        autopadContent={false}
        className="md-background badges__notifications__dialog"
        contentClassName={cn('badges__notifications__dialog__content', {
          'md-grid': !empty,
          'badges__notifications__dialog__content--empty': empty,
        })}
      >
        <CSSTransitionGroup transitionName="fade" transitionLeaveTimeout={150} transitionEnterTimeout={150}>
          {content}
        </CSSTransitionGroup>
      </Dialog>
    </Collapse>
  );
};

NotificationDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};
export default NotificationDialog;
