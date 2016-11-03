/**
 * This validator checkes that the current prop is valid and defined ONLY if
 * any of the `otherPropNames` are not true or defined.
 *
 * @param {function} validator - The React PropTypes validator to use for the given prop.
 * @param {String[]} otherPropNames - Any other prop names to validate against.
 * @return {Error} an error or null
 */
export default function requiredForA11yIfNot(validator, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const defined = typeof props[propName] !== 'undefined';

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && !defined && !otherPropNames.filter(pn => !!props[pn]).length) {
      err = new Error(
        `The \`${propFullNameSafe}\` ${location} is required to make \`${componentNameSafe}\` accessible ` +
        'for users of assistive technologies such as screen readers.'
      );
    }

    return err;
  };
}
