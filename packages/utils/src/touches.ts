import isPassiveEventsSupported from "./isPassiveEventsSupported";

export type TouchTypes = "start" | "end" | "cancel" | "move";

/**
 * A helper function for manually setting touch events on elements when they cannot be directly
 * added with a React event listener. This will attempt to create a passive event if the browser
 * supports passive events so there is better scroll performance.
 */
export function setTouchEvent(
  /**
   * Boolean if the event should be added or removed.
   */
  add: boolean,
  /**
   * The element to add the touch event to.
   */
  el: Window | HTMLElement,
  /**
   * One of the touch types to modify.
   */
  eventType: TouchTypes,
  /**
   * The touch event callback function to use.
   */
  callback: (e: TouchEvent) => void,
  /**
   * Boolean if the event should be captured if the browser does not support
   * passive events.
   */
  capture: boolean = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: { [key: string]: any }
) {
  // @ts-ignore
  el[`${add ? "add" : "remove"}EventListener`](
    `touch${eventType}`,
    callback,
    isPassiveEventsSupported ? { passive: true, capture, ...options } : capture
  );
}

/**
 * A simple wrapper for the `setTouchEvent` to just always add events.
 */
export function addTouchEvent(
  /**
   * The element to add the touch event to.
   */
  el: Window | HTMLElement,
  /**
   * One of the touch types to modify.
   */
  eventType: TouchTypes,
  /**
   * The touch event callback function to use.
   */
  callback: (e: TouchEvent) => void,
  /**
   * Boolean if the event should be captured if the browser does not support
   * passive events.
   */
  capture: boolean = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: { [key: string]: any }
) {
  setTouchEvent(true, el, eventType, callback, capture, options);
}

/**
 * A simple wrapper for the `setTouchEvent` to just always remove events.
 */
export function removeTouchEvent(
  /**
   * The element to add the touch event to.
   */
  el: Window | HTMLElement,
  /**
   * One of the touch types to modify.
   */
  eventType: TouchTypes,
  /**
   * The touch event callback function to use.
   */
  callback: (e: TouchEvent) => void,
  /**
   * Boolean if the event should be captured if the browser does not support
   * passive events.
   */
  capture: boolean = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: { [key: string]: any }
) {
  setTouchEvent(false, el, eventType, callback, capture, options);
}
