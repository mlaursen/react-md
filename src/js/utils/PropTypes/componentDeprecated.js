export default function componentDeprecated(reason) {
  return function validate(props, propName, componentName) {
    const componentNameSafe = componentName || '<<anonymous>>';

    return new Error(
      `The \`${componentNameSafe}\` has been deprecated and will be removed in the next release. ${reason}`
    );
  };
}
