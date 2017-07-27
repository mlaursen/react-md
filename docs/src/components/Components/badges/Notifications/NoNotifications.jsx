import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';

const NoNotifications = () => (
  <div className="badges__notifications__empty">
    <Paper className="md-text badges__notifications__empty__message" zDepth={1}>All caught up!</Paper>
    <FontIcon className="badges__notifications__empty__icon">notifications</FontIcon>
  </div>
);
export default NoNotifications;
