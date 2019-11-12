/** @module utils/StringUtils/getDisplayName */

/**
 * Gets the display name for a composed component.
 *
 * @param {function|Object} ComposedComponent - The composed component to use
 * @param {String} hoc - The higher order component's name to use.
 * @return {String} the new name of the component.
 */
export default function getDisplayName(ComposedComponent, hoc) {
  const name = `${ComposedComponent.displayName || ComposedComponent.name || 'Component'}`;

  return `with${hoc}(${name})`;
}
