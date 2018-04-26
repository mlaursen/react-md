/** @module utils/Positioning/getScroll */

/**
 * A utility function to just get an element's scroll x and y
 * values. This is really just needed because `window` uses
 * different attributes.
 *
 * @param {Object} el - The element to get a scroll value from.
 * @return {Object} an object containing the scrollX and scrollY of the element.
 */
export default function getScroll(el) {
  if (typeof el.scrollX !== 'undefined' && typeof el.scrollY !== 'undefined') {
    return { x: el.scrollX, y: el.scrollY };
  } else if (typeof el.scrollLeft !== 'undefined' && typeof el.scrollTop !== 'undefined') {
    return { x: el.scrollLeft, y: el.scrollTop };
  }

  return { x: 0, y: 0 };
}
