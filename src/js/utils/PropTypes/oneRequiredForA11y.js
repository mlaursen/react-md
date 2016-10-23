/**
 * This validator checks that either the current prop is defined and valid or that one of the
 * other given prop names are defined. If it fails it returns an error for a11y.
 *
 * @param {function} validator - The React PropTypes validator to use for the given prop.
 * @param {String[]} otherPropNames - Any other prop names to validate against.
 * @return {Error} an error or null
 */
export default function oneRequiredForA11y(validator, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const allPropNames = [propFullNameSafe].concat(otherPropNames);

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && !allPropNames.filter(pn => typeof props[pn] !== 'undefined').length) {
      err = new Error(
        `One of the following props are required to make ${componentNameSafe} accessible ` +
        `for users of assistive technologies such as screen readers. \`${allPropNames.join('`, ')}\`.`
      );
    }

    return err;
  };
}
