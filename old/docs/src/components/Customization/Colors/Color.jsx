import React from 'react';
import PropTypes from 'prop-types';
import { bem } from 'react-md';

const base = 'color-palette';

const Color = ({ name, light, divide, color }) => {
  let colorName;
  if (color) {
    colorName = <h4 className={bem(base, 'color-name', {}, 'md-text-capitalize')}>{color.replace(/-/g, ' ')}</h4>;
  }

  return (
    <li className={bem(base, 'color', { light, divide, [name]: name, 'primary': color })}>
      {colorName}
      <div className={bem(base, 'sass-variable')}>{name}</div>
    </li>
  );
};

Color.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  light: PropTypes.bool.isRequired,
  divide: PropTypes.bool.isRequired,
};

export default Color;
