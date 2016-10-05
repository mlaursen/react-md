/**
 * This function will capture the next event and stop propagation during the
 * bubbling cycle of events. This is really only useful if you want to stop
 * the default behavior of chained events.
 *
 * @param {String} type - The event type to capture.
 * @param {Object|func=} target - Either the DOM node to target, a callback function
 *      to call once the event has been captured, or undefined. If this is undefined,
 *      the event will be captured on the window.
 * @param {func=} callback - An optional callback function to call once the event
 *      has been captured.
 */
export default function captureNextEvent(type, target, callback) {
  const el = typeof target !== 'function' && target ? target : window;
  const cb = typeof target === 'function' ? target : callback;

  const capture = e => {
    e.stopPropagation();
    if (cb) {
      cb(e);
    }

    el.removeEventListener(type, capture, true);
  };

  el.addEventListener(type, capture, true);
}
