/**
 * Right now really only supporting these two events, but can be updated later to
 * add more.
 */
export type ThrottleableEvents = "scroll" | "resize";
export type ThrottleTarget = Window | Document | HTMLElement;

/**
 * This is a "shared" event handler for the provided `eventType`. The event listener
 * will only be created once, but every single callback will be called when the throttled
 * event is triggered. This means that you will need to make sure to remove the provided
 * callback when it is no longer in use.
 */
export interface IThrottledEventHandler {
  /**
   * Adds the provided callback to the throttled event listener.
   */
  add: (callback: EventListener) => void;

  /**
   * Attempts to remove the provided callback from the throttled event
   * listener.
   */
  remove: (callback: EventListener) => void;
}

export interface IThrottleableEvent {
  type: ThrottleableEvents;
  target: ThrottleTarget;
  capture: boolean;
  handler: IThrottledEventHandler;
}

const throttledEvents: IThrottleableEvent[] = [];

/**
 * Creates a throttled event handler for the provided event type and event target.
 */
function createThrottledEventHandler(
  eventType: ThrottleableEvents,
  eventTarget: ThrottleTarget = window,
  /**
   * Boolean if the throttled event should capture the event
   */
  capture: boolean = false
): IThrottledEventHandler {
  let running = false;
  const callbacks: EventListener[] = [];
  const runCallbacks = (event: Event) => () => {
    for (const callback of callbacks) {
      callback(event);
    }

    running = false;
  };

  const handler = (event: Event) => {
    if (running) {
      return;
    }

    running = true;
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(runCallbacks(event));
    } else {
      window.setTimeout(runCallbacks(event), 66);
    }
  };

  return {
    /**
     * Attempts to add the provided callback to the list of callbacks for the throttled
     * event. If this is the first callback to be added, the throttled event will also
     * be started.
     */
    add: (callback: EventListener) => {
      if (!callbacks.length) {
        eventTarget.addEventListener(eventType, handler, capture);
      }

      if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
      }
    },

    /**
     * Attempts to remove the provided callback from the lsit of callbacks for the throttled
     * event. If this is the last callback that was removed, the throttled event will also be
     * stopped.
     */
    remove: (callback: EventListener) => {
      const i = callbacks.indexOf(callback);
      if (i >= 0) {
        callbacks.splice(i, 1);

        if (!callbacks.length) {
          eventTarget.removeEventListener(eventType, handler, capture);
        }
      }
    },
  };
}

/**
 * Creates a throttled event listener using custom events. Most of this code comes
 * from the MDN about resize listeners.
 *
 * This will return an object for adding or removing event handlers for the provided
 * `eventType` since only one base throttled event listener will be created. Each callback
 * that is added will be called with the event each time the throttled event is triggered.
 * This does mean that you will manually need to remove your callback like normal or else
 * it can be called when no longer in use. This also means that it doesn't "hurt" to call
 * this function without immediately calling the `add` function since the throttled event
 * won't start until there is at least 1 callback.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/resize#Examples
 */
export default function throttleEvent(
  eventType: ThrottleableEvents,
  eventTarget: ThrottleTarget = window,
  capture: boolean = false
) {
  let index = -1;
  for (let i = 0; i < throttledEvents.length; i += 1) {
    const event = throttledEvents[i];
    if (event.type === eventType && event.target === eventTarget && event.capture === capture) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    throttledEvents.push({
      type: eventType,
      target: eventTarget,
      capture,
      handler: createThrottledEventHandler(eventType, eventTarget, capture),
    });

    index = throttledEvents.length - 1;
  }

  return throttledEvents[index].handler;
}
