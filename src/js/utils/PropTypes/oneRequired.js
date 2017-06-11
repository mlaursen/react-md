/** @module utils/PropTypes/oneRequired */

/**
 * A simple prop type validation that makes sure that at least this prop or one of the
 * other defined prop names are defined for a component.
 *
 * @param {function} validator - The PropType validator for the current prop.
 * @param {...String} otherPropNames - A single or list of prop names that could be defined
 * @return {Error} a prop type validation error or null.
 */
export default function oneRequired(validator, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const allPropNames = [propFullNameSafe].concat(otherPropNames);

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && !allPropNames.filter(pn => typeof props[pn] !== 'undefined').length) {
      err = new Error(
        `One of the following props are required for the ${componentNameSafe} component. ` +
        `\`${allPropNames.join('`, `')}\`.`
      );
    }

    return err;
  };
}
