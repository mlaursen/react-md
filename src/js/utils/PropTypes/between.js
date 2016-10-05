/** @module PropTypes/between */

import isBetween from '../NumberUtils/isBetween';

/**
 * Validates that a number is between a min and max value.
 *
 * @param {function} validator - The number validator to use.
 * @param {number} min - The min number to use.
 * @param {number} max - The max number to use.
 * @return {Error} the prop type error or null
 */
export default function between(validator, min, max) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    const value = props[propName];
    if (!err && typeof value !== 'undefined' && !isBetween(value, min, max)) {
      err = new Error(
        `You provided a \`${propFullNameSafe}\` ${location} to the ${componentNameSafe} that was ` +
        `not within the range from '${min} - ${max}'. \`${propFullNameSafe}\`: ${value}.`
      );
    }

    return err;
  };
}
