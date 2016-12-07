import getPagePosition from './getPagePosition';

/**
 * Calculates the page offset of an element. If the element
 * is false-ish, an empty object will be returned.
 *
 * This is really only used for calculating an ink position.
 *
 * @param {Node} el - An html node to find a page offset for.
 * @return {Object} an object with a left and top attribute for the page
 *    offset.
 */
export default function calcPageOffset(el) {
  if (!el) {
    return { left: null, right: null };
  }

  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + getPagePosition('x'),
    top: rect.top + getPagePosition('y'),
  };
}
