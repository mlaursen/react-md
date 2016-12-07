/**
 * A custom validator that will throw an error if any of the `ifDefinedProps` are also defined.
 *
 * @param {function} validator - The PropTypes validator to use.
 * @param {String...} ifDefinedProps - any othe rprop names to validate against
 * @return {Error} an error or null
 */
export default function invalidIf(validator, ...ifDefinedProps) {
  return function validate(props, propName, componentName, location, propFullName, ...args) {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    const err = validator(props, propName, componentName, location, propFullName, ...args);
    if (err) {
      return err;
    }

    const defined = typeof props[propName] !== 'undefined' && !!props[propName];
    const othersDefined = ifDefinedProps.filter(name => typeof props[name] !== 'undefined' && !!props[name]);
    if (defined && othersDefined.length) {
      const names = `\`${othersDefined.join('`, `')}\``;
      if (othersDefined.length === 1) {
        return new Error(
          `You provided both a \`${propFullNameSafe}\` and ${names} prop to the ${componentNameSafe} ` +
          'but only one can be given.'
        );
      }

      return new Error(
        `You provided a \`${propFullNameSafe}\` ${location} to the ${componentNameSafe} when ` +
        `the following props were defined: ${names}. Either remove the \`${propFullNameSafe}\` ` +
        'or use the remove all the other props.'
      );
    }

    return null;
  };
}
