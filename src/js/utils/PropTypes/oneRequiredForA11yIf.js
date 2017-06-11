/** @module utils/PropTypes/oneRequiredForA11yIf */

/**
 * A PropType validator to make sure that any of the other prop names have been defined
 * if the current prop is also defined.
 *
 * This is mostly useful for when adding a prop requires additional accessibility props defined
 * as well.
 *
 * @param {function} validator - The current prop's validator.
 */
export default function oneRequiredForA11yIf(validator, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const filterUndefined = pn => typeof props[pn] !== 'undefined';
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const defined = typeof props[propName] !== 'undefined';
    const allPropNames = [propFullNameSafe].concat(otherPropNames);

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && defined && !allPropNames.filter(filterUndefined).length) {
      err = new Error(
        `One of the following props are required to make \`${componentNameSafe}\` accessible ` +
        `for users of assistive technologies such as screen readers when using the \`${propFullNameSafe}\` ` +
        `prop. \`${allPropNames.join('`, `')}\`.`
      );
    }

    return err;
  };
}
