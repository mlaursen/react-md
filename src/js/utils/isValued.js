/** @module utils/isValied */

/**
 * A really simple utility function to check if an input's value is considered "valued".
 *
 * @param {string|number} v - the value to check
 * @return {boolean} true if the value is a number or a non-empty string.
 */
export default function isValued(v) {
  return v === 0 || !!v;
}
