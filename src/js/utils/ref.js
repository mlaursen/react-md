/** @module utils/ref */

/**
 * A utility function to set/save `ref`.
 *
 * @param {function|object} target - a function or an object that is used to save given reference
 * @param {object} value - a reference value that should be saved
 */
export default function setRef(target, value) {
  if (target) {
    const targetType = typeof target;
    if (targetType === 'function') {
      target(value);
    } else if (targetType === 'object') {
      target.current = value;
    }
  }
}
