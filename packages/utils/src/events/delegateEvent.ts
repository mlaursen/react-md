export type DelegatedEventTarget = Window | Document | HTMLElement;

/**
 * This is a "shared" event handler for the provided `eventType`. The event
 * listener will only be created once, but every single callback will be called
 * when the throttled event is triggered. This means that you will need to make
 * sure to remove the provided callback when it is no longer in use.
 */
export interface DelegatedEventHandler {
  /**
   * Adds the provided callback to the throttled event listener.
   */
  add: (callback: EventListener) => void;

  /**
   * Attempts to remove the provided callback from the throttled event listener.
   */
  remove: (callback: EventListener) => void;
}

export interface DelegatableEvent {
  type: string;
  target: DelegatedEventTarget;
  throttle: boolean;
  handler: DelegatedEventHandler;
  options?: boolean | AddEventListenerOptions;
}

const delegatedEvents: DelegatableEvent[] = [];
/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * Creates the delegated event handler that will run all the callbacks once an
 * event happens. The callbacks' invocation can also be throttled for event
 * types that trigger rapidly for additional performance.
 *
 * The `<K extends keyof WindowEventMap` is a nice thing I found while looking
 * through the `lib.d.ts` implementation of `addEventListener` that will allow
 * you to get the "correct" event type when using the `add` and `remove`
 * functions once you have created this event handler. Otherwise there'd be ts
 * errors trying to do `MouseEvent` or `KeyboardEvent` in your listeners.
 */
function createEventHandler<K extends keyof WindowEventMap>(
  throttle: boolean,
  callbacks: EventListener[]
) {
  let running = false;
  const runCallbacks = (event: WindowEventMap[K]) => () => {
    for (let i = 0; i < callbacks.length; i += 1) {
      callbacks[i](event);
    }

    running = false;
  };

  return function eventHandler(event: WindowEventMap[K]) {
    if (!throttle) {
      runCallbacks(event)();
      return;
    }

    if (running) {
      return;
    }

    running = true;
    window.requestAnimationFrame(runCallbacks(event));
  };
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */

/**
 * Creates a throttled event handler for the provided event type and event
 * target.
 */
function createDelegatedEventHandler(
  eventType: string,
  eventTarget: DelegatedEventTarget = window,
  throttle = false,
  options?: boolean | AddEventListenerOptions
): DelegatedEventHandler {
  const callbacks: EventListener[] = [];
  const handler = createEventHandler(throttle, callbacks);

  return {
    /**
     * Attempts to add the provided callback to the list of callbacks for the
     * throttled event. If this is the first callback to be added, the throttled
     * event will also be started.
     */
    add: (callback: EventListener) => {
      if (!callbacks.length) {
        eventTarget.addEventListener(eventType, handler, options);
      }

      if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
      }
    },

    /**
     * Attempts to remove the provided callback from the lsit of callbacks for
     * the throttled event. If this is the last callback that was removed, the
     * throttled event will also be stopped.
     */
    remove: (callback: EventListener) => {
      const i = callbacks.indexOf(callback);
      if (i >= 0) {
        callbacks.splice(i, 1);

        if (!callbacks.length) {
          eventTarget.removeEventListener(eventType, handler, options);
        }
      }
    },
  };
}

/**
 * Creates a delegated event listener using custom events. Most of this code
 * comes from the MDN about resize listeners.
 *
 * This will return an object for adding or removing event handlers for the
 * provided `eventType` since only one base throttled event listener will be
 * created. Each callback that is added will be called with the event each time
 * the event is triggered. This does mean that you will manually need to remove
 * your callback like normal or else it can be called when no longer in use.
 * This also means that it doesn't "hurt" to call this function without
 * immediately calling the `add` function since the event won't start until
 * there is at least 1 callback.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/resize#Examples
 * @param eventType - One of the event types that should be used to create a
 * delegated event for. This should be things like resize, click, scroll, etc.
 * @param eventTarget - The target that should have the delegated event handler
 * attached to. This is normally the window, but can be any element as needed.
 * @param throttle - Boolean if the event should be throttled or not. Normally
 * only event types like resize or scroll should be throttled for performance
 * boosts, but anything can be.
 * @returns The delegated event handler that allows you to add or remove
 * `EventListener`s to that event.
 */
export function delegateEvent(
  eventType: string,
  eventTarget: DelegatedEventTarget = window,
  throttle: boolean = eventType === "resize" || eventType === "scroll",
  options?: boolean | AddEventListenerOptions
): DelegatedEventHandler {
  let index = delegatedEvents.findIndex(
    (event) =>
      event.type === eventType &&
      event.target === eventTarget &&
      event.options === options &&
      event.throttle === throttle
  );

  if (index === -1) {
    delegatedEvents.push({
      type: eventType,
      target: eventTarget,
      options,
      throttle,
      handler: createDelegatedEventHandler(
        eventType,
        eventTarget,
        throttle,
        options
      ),
    });

    index = delegatedEvents.length - 1;
  }

  return delegatedEvents[index].handler;
}
