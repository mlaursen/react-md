import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

const StatusBar = ({ className, ...props }) => (
  <header {...props} className={cn('phone-emulator__status-bar', className)}>
    <FontIcon>network_wifi</FontIcon>
    <FontIcon>network_cell</FontIcon>
    <FontIcon>battery_full</FontIcon>
    <span className="phone-emulator__status-bar__time">12:30</span>
  </header>
);

StatusBar.propTypes = {
  className: PropTypes.string,
};
export default StatusBar;
