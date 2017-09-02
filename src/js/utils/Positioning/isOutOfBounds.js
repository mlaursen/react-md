/** @module utils/Positioning/isOutOfBounds */

import getScreenSize from './getScreenSize';

function isOutHorizontally(fixedTo, child, threshold) {
  const { left: fixedLeft, right: fixedRight } = fixedTo.getBoundingClientRect();
  const { left: childLeft, right: childRight } = child.getBoundingClientRect();
  const offset = child.offsetWidth * threshold;

  const left = childLeft + offset;
  const right = childRight - offset;

  const screenEdge = childLeft === 0 || getScreenSize('Width') === childRight;
  return fixedLeft > left || fixedRight < right || screenEdge;
}

function isOutVertically(fixedTo, child, toggle, threshold) {
  const { top: fixedTop, bottom: fixedBottom } = fixedTo.getBoundingClientRect();
  const { top: childTop, bottom: childBottom } = child.getBoundingClientRect();
  const offset = toggle.offsetHeight * threshold;

  const screenEdge = childTop === 0 || getScreenSize('Height') === childBottom;
  return fixedTop > childTop + offset || fixedBottom < childTop - offset || screenEdge;
}

/**
 * Checks if the fixedTo object for the Layover component is considered
 * out of bounds relative to the container.
 *
 * @param {Object} fixedTo - The Layover's `fixedTo` prop.
 * @param {Object} child - The Layover's `children` prop as a DOM element.
 * @param {Object} toggle - The Layover's `toggle` prop as a DOM element.
 * @param {number} verticalThreshold - The vertical threshold multiplier to apply.
 * @param {number} horizontalThreshold - The horizontal threshold multiplier to apply.
 * @return {boolean} true if the Layover's `fixedTo` prop is considered out of bounds.
 */
export default function isOutOfBounds(fixedTo, child, toggle, verticalThreshold, horizontalThreshold) {
  if (fixedTo === window) {
    return false;
  } else if (fixedTo.x || fixedTo.y) {
    const { x, y } = fixedTo;
    return (!!y && isOutVertically(y, child, toggle, verticalThreshold)) ||
      (!!x && isOutHorizontally(x, child, horizontalThreshold));
  }

  return isOutVertically(fixedTo, child, toggle, verticalThreshold) ||
    isOutHorizontally(fixedTo, child, horizontalThreshold);
}
