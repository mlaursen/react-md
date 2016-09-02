import { PropTypes } from 'react';

/**
 * Validates the a component is fully controlled or uncontrolled.  If the given prop is not
 * `undefined`, it will check if the `funcName` is defined and a function. A missing function
 * will generate an error similar to the built-in React controlled validation message.
 *
 * @param {String} funcName - The function name to use for additional validation.
 * @param {function} validator - The PropTypes validator to use for the given prop.
 * @return {Error} an error or null.
 */
export function controlled(funcName, validator) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && typeof props[propName] !== 'undefined' && !props.readOnly) {
      const funcError = PropTypes.func.isRequired(props, funcName, componentName, location, propFullName, ...args);
      if (funcError) {
        err = new Error(
          `You provided a \`${propFullNameSafe}\` ${location} to the ${componentNameSafe} without a ` +
          `\`${funcName}\` handler. This will render a read only field. Set either the \`${funcName}\` ` +
          'or use the `defaultValue` instead.'
        );
      }
    }

    return err;
  };
}

/**
 * Validates the a prop's value is greater than or equal to the minimum value.
 *
 * @param {Number} min - the minimum value for the prop.
 * @param {Boolean} required - Boolean if the prop is required.
 * @return {Error} an error or null.
 */
export function minNumber(min, required) {
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

/**
 * Validates the a prop's value is less than or equal to the minimum value.
 *
 * @param {Number} max - the maximum value for the prop.
 * @param {Boolean} required - Boolean if the prop is required.
 * @return {Error} an error or null.
 */
export function maxNumber(max, required) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    let validator = PropTypes.number;
    if (required) {
      validator = validator.isRequired;
    }

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!required && !err && props[propName] > max) {
      err = new Error(
        `The ${location} \`${propFullNameSafe}\` must be less than or equal to the min value ` +
        `\`${max}\` but received \`${props[propName]}\` for the \`${componentNameSafe}\` component.`
      );
    }

    return err;
  };
}
