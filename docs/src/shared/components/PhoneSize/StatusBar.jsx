import React, { PropTypes } from 'react';
import FontIcon from 'react-md/lib/FontIcons';
import cn from 'classnames';

const StatusBar = ({ mobile, className }) => {
  if (mobile) {
    return null;
  }

  return (
    <div className={cn('phone-status-bar', className)}>
      <FontIcon>network_wifi</FontIcon>
      <FontIcon>network_cell</FontIcon>
      <FontIcon>battery_full</FontIcon>
      <span className="phone-time">12:30</span>
    </div>
  );
};

StatusBar.propTypes = {
  className: PropTypes.string,
  mobile: PropTypes.bool,
};

export default StatusBar;
