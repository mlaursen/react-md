import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';

const NoNotifications = () => (
  <div className="no-notifications-container">
    <Paper className="no-notifications-message md-text" zDepth={1}>All caught up!</Paper>
    <FontIcon className="no-notifications-icon">notifications</FontIcon>
  </div>
);
export default NoNotifications;
