/** @module utils/Positioning/viewport */
import getScreenSize from './getScreenSize';

/**
 * Determines if an element is still in the viewport. If it is,
 * it will return a `true` boolean. If it is not, it will return
 * an object containing booleans for top, right, bottom, and left
 * where a `false` value will mean it is out of the viewport for that
 * position.
 *
 * @param {Object} el - The element to test.
 * @return {boolean|Object} the results.
 */
export default function viewport(el) {
  if (!el) {
    return {};
  }

  const rect = el.getBoundingClientRect();
  const top = rect.top >= 0;
  const right = rect.right <= getScreenSize('Width');
  const bottom = rect.bottom <= getScreenSize('Height');
  const left = rect.left >= 0;

  return top && right && bottom && left || { top, right, bottom, left };
}
