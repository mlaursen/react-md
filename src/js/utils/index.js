export function setOverflow(enabled, selector) {
  let el = selector ? document.querySelector(selector) : document.body;
  if(enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
}

export function numberBetween(num, min, max) {
  return Math.max(min, Math.min(num, max));
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

export function getTouchOffset(event) {
  const el = event.target;
  const rect = el.getBoundingClientRect();
  return {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
}

export function isPointInCircle(cx, cy, r, x, y) {
  const distance = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
  return distance <= Math.pow(r, 2);
}

/**
 * Amzing media query to check if mobile..
 * @return true if device width is between 0 and 599px
 */
export const isMobile = (() => {
  return window.matchMedia('only screen and (min-width: 0px) and (max-width: 599px)').matches;
})();

export const isTouchDevice = (() => {
  const msTouch = window.navigator.msMaxTouchPoints;
  const touch = 'ontouchstart' in document.createElement('div');
  return msTouch || touch;
})();


export function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;
  if(currentTime < 1) {
    return change / 2 * currentTime * currentTime + start;
  }
  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime -2 ) - 1) + start;
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
export function animate(el, increment, elapsedTime, transitionTime, styleName, startValue, currentValue, finalValue, next) {
  elapsedTime += increment;
  el.style[styleName] = easeInOut(elapsedTime, startValue, finalValue, transitionTime) + 'px';

  if(elapsedTime < transitionTime) {
    setTimeout(() => {
      animate(el, increment, elapsedTime, transitionTime, styleName, startValue, currentValue, finalValue, next);
    }, increment);
  } else {
    next(elapsedTime);
  }
}

export * from './dates';
