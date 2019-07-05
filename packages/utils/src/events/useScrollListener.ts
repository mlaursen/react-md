import { useEffect } from "react";

import useRefCache from "../useRefCache";

import delegateEvent from "./delegateEvent";
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

/**
 * This hook will create a performant scroll listener by enabling passive events if it's
 * supported by the browser and delegating the event as needed.
 */
export default function useScrollListener<E extends HTMLElement = HTMLElement>({
  enabled,
  onScroll,
  element,
  options = isSupported ? { passive: true, capture: true } : true,
}: Options<E>) {
  const callback = useRefCache(onScroll);

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
