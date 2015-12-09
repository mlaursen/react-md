'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPropEnabled = isPropEnabled;
exports.easeInOut = easeInOut;
exports.animate = animate;
exports.fuzzyFilter = fuzzyFilter;
/**
 * Checks if a prop is enabled on a component by checking if the key exists
 * in the props and that key has not been set to false instead of undefined.
 *
 * @param {object} props the component's props
 * @param {string} propName the prop name to check
 * @param {array} keys? the keys to check. Defaults to the keys of props if ommitted
 */
function isPropEnabled(props, propName) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? Object.keys(props) : arguments[2];

  return keys.indexOf(propName) !== -1 && props[propName] !== false;
}

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

function fuzzyFilter(items, word) {
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  if (!items || !items.length || !word) {
    return items;
  }

  var lv = word.toLowerCase();
  return items.filter(function (item) {
    var li = (key ? item[key] : item).toLowerCase();
    var lastFound = -1;
    for (var i = 0; i < lv.length; i++) {
      lastFound = li.indexOf(lv[i], lastFound + i);
      if (lastFound === -1) {
        return false;
      }
    }
    return true;
  });
}
//# sourceMappingURL=PropUtils.js.map