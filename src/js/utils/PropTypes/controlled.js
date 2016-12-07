/** @module PropTypes/controlled */
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
export default function controlled(validator, funcName, fallbackPropName = 'defaultValue') {
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
          `or use the \`${fallbackPropName}\` instead.`
        );
      }
    }

    return err;
  };
}
