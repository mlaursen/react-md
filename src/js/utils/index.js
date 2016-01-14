import classnames from 'classnames';


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
 * Checkis of the given thing is an object
 * @param thing the thing to check
 * @return true if the thing is an object
 */
export function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

export function mergeClassNames(props, ...classNames) {
  return classnames(...classNames, props.className, {
    'md-primary': isPropEnabled(props, 'primary'),
    'md-secondary': isPropEnabled(props, 'secondary'),
  });
}
