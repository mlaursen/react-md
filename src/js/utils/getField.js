/**
 * Gets the current field for a component that can the field
 * as either uncontrolled or controlled.
 *
 * @param {Object} props - the props object.
 * @param {Object} state = the state object.
 * @param {string=} field - the field to extract a value from. Defaults to 'value'.
 *
 * @return the field's value.
 */
export default function getField(props, state, field = 'value') {
  return typeof props[field] !== 'undefined' ? props[field] : state[field];
}
