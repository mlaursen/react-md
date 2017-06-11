/** @module utils/PropTypes/componentDeprecated */

/**
 * A simple PropType validation that shows that a component is deprecated and also prints
 * a reason for the deprecation.
 *
 * @param {String} reason - The reason that the component is deprecated.
 * @return {Error} a prop type validation error.
 */
export default function componentDeprecated(reason) {
  return function validate(props, propName, componentName) {
    const componentNameSafe = componentName || '<<anonymous>>';

    return new Error(
      `The \`${componentNameSafe}\` has been deprecated and will be removed in the next release. ${reason}`
    );
  };
}
