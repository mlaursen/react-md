/**
 * This validator checks that the given prop is valid. If any of the `otherPropNames` are true,
 * it also requires this to be defined for a11y.
 *
 * @param {function} validator - The React PropTypes validator to use for the given prop.
 * @param {String[]} otherPropNames - Any other prop names to validate against.
 * @return {Error} an error or null
 */
export default function requiredForA11yIf(validator, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const defined = typeof props[propName] !== 'undefined';

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && !defined && otherPropNames.filter(pn => !!props[pn]).length) {
      err = new Error(
        `The \`${propFullNameSafe}\` ${location} is required to make \`${componentNameSafe}\` accessible ` +
        'for users of assistive technologies such as screen readers.'
      );
    }

    return err;
  };
}
