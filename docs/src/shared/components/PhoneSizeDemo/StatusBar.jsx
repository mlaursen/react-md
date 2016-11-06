import React, { PropTypes } from 'react';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

const StatusBar = ({ className, ...props }) => (
  <header {...props} className={cn('phone-status-bar', className)}>
    <FontIcon>network_wifi</FontIcon>
    <FontIcon>network_cell</FontIcon>
    <FontIcon>battery_full</FontIcon>
    <span className="phone-time">12:30</span>
  </header>
);

StatusBar.propTypes = {
  className: PropTypes.string,
};

export default StatusBar;
