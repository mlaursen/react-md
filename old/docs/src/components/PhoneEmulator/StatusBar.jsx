import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, bem } from 'react-md';

const base = bem('phone-emulator', 'status-bar');

const StatusBar = ({ className, ...props }) => (
  <header {...props} className={bem(base, {}, className)}>
    <FontIcon>network_wifi</FontIcon>
    <FontIcon>network_cell</FontIcon>
    <FontIcon>battery_full</FontIcon>
    <span className={bem(base, 'time')}>12:30</span>
  </header>
);

StatusBar.propTypes = {
  className: PropTypes.string,
};
export default StatusBar;
