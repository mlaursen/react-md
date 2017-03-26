import React, { PropTypes } from 'react';
import cn from 'classnames';

const Color = ({ name, light, divide, color }) => {
  let colorName;
  if (color) {
    colorName = <h4 className="color-palette__color-name md-text-capitalize">{color.replace(/-/g, ' ')}</h4>;
  }

  return (
    <li
      className={cn('color-palette__color', `color-palette__color--${name}`, {
        'color-palette__color--primary': color,
        'color-palette__color--light': light,
        'color-palette__color--divide': divide,
      })}
    >
      {colorName}
      <div className="color-palette__sass-variable">{name}</div>
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
