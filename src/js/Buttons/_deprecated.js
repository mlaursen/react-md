export default function deprecated(enabledBy) {
  return function validate(props, propName, componentName) {
    const componentNameSafe = componentName || '<<anonymous>>';

    return new Error(
      `The \`${componentNameSafe}\` has been deprecated and will be removed in the next release. ` +
      `Switch to the \`Button\` component and add the \`${enabledBy}\` prop for previous functionality.`
    );
  };
}
