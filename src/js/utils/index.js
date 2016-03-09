import classnames from 'classnames';

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

/**
 * Merges any given classnames along with adding md-primary, or
 * md-secondary from the props
 *
 * @param {Object} props the prosp to get className and check for primary or secondary
 * @param {...string} classNames any additional classnames to merge
 * @return string
 */
export function mergeClassNames(props, ...classNames) {
  return classnames(...classNames, props.className, {
    'md-primary': isPropEnabled(props, 'primary'),
    'md-secondary': isPropEnabled(props, 'secondary'),
  });
}

export function setOverflow(enabled, selector) {
  let el = selector ? document.querySelector(selector) : document.body;
  if(enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
}

export function smoothScroll(el, duration, options = {}) {
  let { callback, toEl, stepAmt } = options;
  if(!stepAmt) { stepAmt = 15; }

  if(toEl) {
    // TODO: Implement smooth scroll to element
    const toPos = toEl.getBoundingClientRect().top + document.body.scrollTop;
    el.scrollTo(el.scrollX, toPos - 65 - 15); // 65 is app bar height
    return;
  }

  const scrollHeight = el.scrollY || el.scrollTop;
  const scrollStep = Math.PI / (duration / stepAmt);
  const cosParam = scrollHeight / 2;

  let scrollCounter = 0;
  let scrollMargin;

  function step() {
    setTimeout(function() {
      let h = el.scrollY || el.scrollTop;
      if(h || h > 0) {
        requestAnimationFrame(step);

        scrollCounter++;
        scrollMargin = cosParam - cosParam * Math.cos(scrollCounter * scrollStep);

        let scroll = scrollHeight - scrollMargin;
        if(scroll <= 10) {
          scroll = 0;
        }

        if(el.scrollY) {
          el.scrollTo(el.scrollX, scroll);
        } else {
          el.scrollTop = scroll;
        }
      } else {
        callback && callback();
      }
    }, stepAmt);
  }

  requestAnimationFrame(step);
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

export const focusableQueryStr = ['input', 'select', 'textarea', 'button'].map(e => `${e}:not([disabled])`).concat(['a[href]', 'area[href]', 'iframe', '[tabindex]', '[contentEditable=true]']).map(el => el + ':not([tabindex=\'-1\'])').join(',');
export const getFirstFocusable = el => el.querySelector(focusableQueryStr);

export * from './dates';
