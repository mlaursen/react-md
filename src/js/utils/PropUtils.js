/**
 * Checks if a prop is enabled on a component by checking if the key exists
 * in the props and that key has not been set to false instead of undefined.
 *
 * @param {object} props the component's props
 * @param {string} propName the prop name to check
 * @param {array} keys? the keys to check. Defaults to the keys of props if ommitted
 */
export function isPropEnabled(props, propName, keys = Object.keys(props)) {
  return keys.indexOf(propName) !== -1 && props[propName] !== false;
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

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


export function fuzzyFilter(items, word, key = null) {
  if(!items || !items.length || !word) { return items; }

  const lv = word.toLowerCase();
  return items.filter(item => {
    const li = (key ? item[key] : item).toLowerCase();
    let lastFound = -1;
    for(let i = 0; i < lv.length; i++) {
      lastFound = li.indexOf(lv[i], lastFound + i);
      if(lastFound === -1) {
        return false;
      }
    }
    return true;
  });
}
