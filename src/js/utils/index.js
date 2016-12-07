/* eslint-disable no-param-reassign */

export function setOverflow(enabled, selector) {
  const el = selector ? document.querySelector(selector) : document.body;
  if (enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
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
