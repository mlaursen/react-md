/**
 * Checks if a prop is enabled on a component by checking if the key exists
 * in the props and that key has not been set to false instead of undefined.
 *
 * @param {object} props the component's props
 * @param {string} propName the prop name to check
 * @param {array} keys? the keys to check. Defaults to the keys of props if ommitted
 */
export function isPropEnabled(props, propName, keys = Object.keys(props)) {
  return keys.indexOf(propName) !== -1 && props[propName] !== false;
}
