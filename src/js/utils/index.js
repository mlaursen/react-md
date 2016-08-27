/* eslint-disable no-param-reassign */

export function setOverflow(enabled, selector) {
  const el = selector ? document.querySelector(selector) : document.body;
  if (enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
}

/**
 * Checkis of the given thing is an object
 * @param thing the thing to check
 * @return true if the thing is an object
 */
export function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function getScrollProp(key) {
  // document.body is deprecated for some browsers
  return Math.max(document.body[key], document.documentElement[key]);
}

export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScrollProp('scrollLeft'),
    top: rect.top + getScrollProp('scrollTop'),
  };
}

/**
 * Generates an object of an offsetX and offsetY from
 * a mouse or touch event.
 *
 * @param {Object} event The event to extract data from
 * @return {Object} an object holding the offsetX and offsetY of the event.
 */
export function getTouchOffset(event) {
  const el = event.target;
  const rect = el.getBoundingClientRect();
  const { clientX, clientY } = event.changedTouches ? event.changedTouches[0] : event;
  return {
    offsetX: clientX - rect.left,
    offsetY: clientY - rect.top,
  };
}

/**
 * Determines if a point is in a circle.
 *
 * @param {Number} cx the center X coordinate in the circle
 * @param {Number} cy the center Y coordinate in the circle
 * @param {Number} r the radius of the circle
 * @param {Number} x the x coordinate to check
 * @param {Number} y the y coordinate to check
 * @return {bool} true if the given x and y coordinates are in the circle.
 */
export function isPointInCircle(cx, cy, r, x, y) {
  const distance = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
  return distance <= Math.pow(r, 2);
}

export function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if (currentTime < 1) {
    return change / 2 * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

/**
 *
 * @param el
 * @param increment
 * @param elapsedTime
 * @param transitionTime
 * @param styleName
 * @param currentValue
 * @param finalValue
 * @param next
 */
export function animate(
  el,
  increment,
  elapsedTime,
  transitionTime,
  styleName,
  startValue,
  currentValue,
  finalValue,
  next
) {
  elapsedTime += increment;
  el.style[styleName] = `${easeInOut(elapsedTime, startValue, finalValue, transitionTime)}px`;

  if (elapsedTime < transitionTime) {
    setTimeout(() => {
      animate(el, increment, elapsedTime, transitionTime, styleName, startValue, currentValue, finalValue, next);
    }, increment);
  } else {
    next(elapsedTime);
  }
}

/**
 * Takes an event, a container node, and a function to call if the clicked
 * element is not inside of the container node.
 *
 * @param {Object} event the click event
 * @param {Object} node the container node to compare against
 * @param {func} callback the function to call if the clicked element
 *    is not inside the container node
 */
export function onOutsideClick(event, node, callback) {
  let target = event.target;
  if (target === node) { return; }

  while (target.parentNode) {
    if (target === node) { return; }
    target = target.parentNode;
  }

  callback(event);
}

/**
 * Checks if touch events are in the browser.
 * @return {bool} true if it is a touch device
 */
export function isTouchDevice() {
  return typeof window !== 'undefined'
    && ('ontouchstart' in window || !!navigator.maxTouchPoints);
}
