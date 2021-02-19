import { isSupported } from "./passiveEvents";

export type TouchTypes = "start" | "end" | "cancel" | "move";

/**
 * A helper function for manually setting touch events on elements when they
 * cannot be directly added with a React event listener. This will attempt to
 * create a passive event if the browser supports passive events so there is
 * better scroll performance.
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
  capture = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: AddEventListenerOptions
): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  el[`${add ? "add" : "remove"}EventListener`](
    `touch${eventType}`,
    callback,
    isSupported ? { passive: true, capture, ...options } : capture
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
  capture = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: AddEventListenerOptions
): void {
  setTouchEvent(true, el, eventType, callback, capture, options);
}

/**
 * A simple wrapper for the `setTouchEvent` to just always remove events.
 *
 * @param el - The element to add the touch event to.
 * @param eventType - One of the touch types to modify.
 */
export function removeTouchEvent(
  el: Window | HTMLElement,
  eventType: TouchTypes,
  /**
   * The touch event callback function to use.
   */
  callback: (e: TouchEvent) => void,
  /**
   * Boolean if the event should be captured if the browser does not support
   * passive events.
   */
  capture = false,
  /**
   * Any additional options to provide to the passive event.
   */
  options?: AddEventListenerOptions
): void {
  setTouchEvent(false, el, eventType, callback, capture, options);
}
