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
