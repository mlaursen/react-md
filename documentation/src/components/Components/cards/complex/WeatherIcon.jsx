import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FontIcon from 'react-md/lib/FontIcons';

const WeatherIcon = ({ icon, big, yellow }) => (
  <FontIcon
    iconClassName={`wi wi-${icon}`}
    className={cn('cards__weather__icon', {
      'cards__weather__icon--big': big,
      'cards__weather__icon--yellow': yellow,
    })}
  />
);

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  big: PropTypes.bool,
  yellow: PropTypes.bool,
};

WeatherIcon.defaultProps = {
  yellow: true,
};

export default WeatherIcon;
