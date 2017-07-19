// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
let supportsPassive;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('test', null, opts);
} catch (e) {
  supportsPassive = false;
}

/**
 * A helper function for manually setting touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {boolean} add - Boolean if the event listener should be added or removed.
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
export function setTouchEvent(add, el, eventType, callback, options) {
  return el[`${add ? 'add' : 'remove'}EventListener`](
    `touch${eventType}`,
    callback,
    supportsPassive ? { passive: true, ...options } : false
  );
}

/**
 * A helper function for manually adding touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
export function addTouchEvent(el, type, callback, options) {
  return setTouchEvent(true, el, type, callback, options);
}

/**
 * A helper function for manually removing touch events on elements with the passive
 * option (when it is supported).
 *
 * @param {HTMLElement} el - The element to add the listener to.
 * @param {String} type - the event type to set. This should be 'start', 'move', or 'end'
 * @param {function} callback - The event listener callback function.
 * @param {Object=} options - any additional options to apply.
 */
export function removeTouchEvent(el, type, callback, options) {
  return setTouchEvent(false, el, type, callback, options);
}
