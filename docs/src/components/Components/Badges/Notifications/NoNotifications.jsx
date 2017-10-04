import React from 'react';
import { FontIcon, Paper } from 'react-md';

const NoNotifications = () => (
  <div className="badges__notifications__empty">
    <Paper className="md-text badges__notifications__empty__message" zDepth={1}>All caught up!</Paper>
    <FontIcon className="badges__notifications__empty__icon">notifications</FontIcon>
  </div>
);
export default NoNotifications;
