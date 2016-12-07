/** @module PropTypes/minNumber */

import { PropTypes } from 'react';

/**
 * Validates the a prop's value is greater than or equal to the minimum value.
 *
 * @param {Number} min - the minimum value for the prop.
 * @param {Boolean} required - Boolean if the prop is required.
 * @return {Error} an error or null.
 */
export default function minNumber(min, required) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    let validator = PropTypes.number;
    if (required) {
      validator = validator.isRequired;
    }

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!required && !err && props[propName] < min) {
      err = new Error(
        `The ${location} \`${propFullNameSafe}\` must be greater than or equal to the min value ` +
        `\`${min}\` but received \`${props[propName]}\` for the \`${componentNameSafe}\` component.`
      );
    }

    return err;
  };
}
