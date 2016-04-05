'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOverflow = setOverflow;
exports.numberBetween = numberBetween;
exports.isObject = isObject;
exports.getOffset = getOffset;
exports.getTouchOffset = getTouchOffset;
exports.isPointInCircle = isPointInCircle;
exports.easeInOut = easeInOut;
exports.animate = animate;
function setOverflow(enabled, selector) {
  var el = selector ? document.querySelector(selector) : document.body;
  if (enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
}

function numberBetween(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

/**
 * Checkis of the given thing is an object
 * @param thing the thing to check
 * @return true if the thing is an object
 */
function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function getScrollProp(key) {
  // document.body is deprecated for some browsers
  return Math.max(document.body[key], document.documentElement[key]);
}

function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScrollProp('scrollLeft'),
    top: rect.top + getScrollProp('scrollTop')
  };
}

function getTouchOffset(event) {
  var el = event.target;
  var rect = el.getBoundingClientRect();
  return {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };
}

function isPointInCircle(cx, cy, r, x, y) {
  var distance = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
  return distance <= Math.pow(r, 2);
}

/**
 * Amzing media query to check if mobile..
 * @return true if device width is between 0 and 599px
 */
var isMobile = exports.isMobile = function () {
  return window.matchMedia('only screen and (min-width: 0px) and (max-width: 599px)').matches;
}();

var isTouchDevice = exports.isTouchDevice = function () {
  var msTouch = window.navigator.msMaxTouchPoints;
  var touch = 'ontouchstart' in document.createElement('div');
  return msTouch || touch;
}();

function easeInOut(currentTime, start, change, duration) {
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
function animate(el, increment, elapsedTime, transitionTime, styleName, startValue, currentValue, finalValue, next) {
  elapsedTime += increment;
  el.style[styleName] = easeInOut(elapsedTime, startValue, finalValue, transitionTime) + 'px';

  if (elapsedTime < transitionTime) {
    setTimeout(function () {
      animate(el, increment, elapsedTime, transitionTime, styleName, startValue, currentValue, finalValue, next);
    }, increment);
  } else {
    next(elapsedTime);
  }
}