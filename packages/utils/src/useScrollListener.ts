import { useEffect, useRef } from "react";
import { delegateEvent } from "./delegateEvent";
import { isSupported } from "./passiveEvents";

export interface Options<E extends HTMLElement = HTMLElement> {
  /**
   * A function that is called whenever the scroll event is triggered.
   */
  onScroll: EventListener;

  /**
   * Any event listener options to use when attaching the event.
   */
  options?: AddEventListenerOptions | boolean;

  /**
   * Boolean if the scroll listener should be enabled. You can swap this
   * boolean to `true` or `false` to add/remove the event listeners. The
   * event listeners will *always* be removed when the parent component is
   * unmounted though.
   */
  enabled?: boolean;

  /**
   * The element that should gain the focus event. When this is omitted, it
   * will default to the entire `window`.
   */
  element?: E | null;
}

export default function useScrollListener<E extends HTMLElement = HTMLElement>({
  enabled,
  onScroll,
  element,
  options = isSupported ? { passive: true, capture: true } : true,
}: Options<E>) {
  // creating a ref so the event handler doesn't need to be updated each re-render
  // if using an arrow function for the resize handler
  const callback = useRef(onScroll);
  useEffect(() => {
    callback.current = onScroll;
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const eventHandler = delegateEvent(
      "scroll",
      element || window,
      true,
      options
    );
    const handler = (event: Event) => callback.current(event);
    eventHandler.add(handler);
    return () => {
      eventHandler.remove(handler);
    };
  }, [enabled, element, options]);
}
