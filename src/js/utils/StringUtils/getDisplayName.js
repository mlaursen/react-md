
/**
 * Gets the display name for a composed component.
 *
 * @param {function} ComposedComponent - The composed component to use
 * @return {String} the name of the composed component or 'Component'.
 */
export default function getDisplayName(ComposedComponent, suffix) {
  const name = `${ComposedComponent.displayName || ComposedComponent.name || 'Component'}`;

  return name.indexOf(suffix) === -1 ? `${name}${suffix}` : name;
}
