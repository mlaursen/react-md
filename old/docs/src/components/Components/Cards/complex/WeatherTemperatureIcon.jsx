import React from 'react';
import PropTypes from 'prop-types';
import { IconSeparator } from 'react-md';

import { DEGREES } from 'constants/unicode';
import WeatherIcon from './WeatherIcon';

const WeatherTemperatureIcon = ({ min, max, sunny }) => {
  const label = [
    <span key="min" className="md-color--text">{`${max}${DEGREES}`}</span>,
    '/',
    <span key="max" className="md-color--secondary-text">{`${min}${DEGREES}`}</span>,
  ];

  return (
    <IconSeparator label={label} iconBefore>
      <WeatherIcon icon={`day-${sunny ? 'sunny' : 'cloudy'}`} />
    </IconSeparator>
  );
};

WeatherTemperatureIcon.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  sunny: PropTypes.bool,
};

WeatherTemperatureIcon.defaultProps = {
  sunny: true,
};

export default WeatherTemperatureIcon;
