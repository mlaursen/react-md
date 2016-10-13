export default function oneRequiredForA11yIf(validator, requiringProp, ...otherPropNames) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const filterUndefined = pn => typeof props[pn] !== 'undefined';
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;
    const requiredDefined = typeof props[requiringProp] !== 'undefined';
    const allPropNames = [propFullNameSafe].concat(otherPropNames);

    let err = validator(props, propName, componentName, location, propFullName, ...args);
    if (!err && requiredDefined && !allPropNames.filter(filterUndefined).length) {
      err = new Error(
        `One of the following props are required to make \`${componentNameSafe}\` accessible ` +
        `for users of assistive technologies such as screen readers when using the \`${requiringProp}\` ` +
        `prop. \`${allPropNames.join('`, `')}\`.`
      );
    }

    return err;
  };
}
