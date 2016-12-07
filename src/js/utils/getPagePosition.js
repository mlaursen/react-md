/**
 * Gets the current page position.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
 * @param {String} direction - The direction that should be retrieved. This
 *    should be either 'x' or 'y'.
 * @return {number} the position of the direction on the page.
 */
export default function getPagePosition(direction) {
  const scroll = `scroll${direction === 'x' ? 'Left' : 'Top'}`;
  if (typeof window.pageXOffset !== 'undefined') {
    return window[`page${direction.toUpperCase()}Offset`];
  } else if ((document.compatMode || '') === 'CSS1Compat') {
    return document.documentElement[scroll];
  } else {
    return document.body[scroll];
  }
}
