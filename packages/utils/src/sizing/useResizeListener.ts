import { useEffect } from "react";

import { delegateEvent } from "../events/delegateEvent";
import { useRefCache } from "../useRefCache";

export interface ResizeListenerOptions {
  /**
   * A function to call when the app is resized.
   */
  onResize: EventListener;

  /**
   * Any event listener options to use when attaching the event.
   */
  options?: boolean | AddEventListenerOptions;

  /**
   * Boolean if the resize event handler should be called immediately once the
   * component is mounted. The default behavior will be to only call the
   * `onResize` event immediately client side and can never be invoked server
   * side since it resize on the `window` to dispatch a `UIEvent`.
   */
  immediate?: boolean;

  /**
   * Boolean if the resize observer should be enabled. You can swap this boolean
   * to `true` or `false` to add/remove the event listeners. The event listeners
   * will *always* be removed when the parent component is unmounted though.
   */
  enabled?: boolean;
}

/**
 * This is a simple hook that will attach a throttled resize event listener when
 * mounted, and detach when it unmounts.
 *
 * This hook only works for entire app resize events. If you are looking for
 * specific element resize events, check out the `ResizeObserver` component or
 * `useReiszeObserver` hook instead.
 */
export function useResizeListener({
  onResize,
  options,
  immediate,
  enabled = true,
}: ResizeListenerOptions): void {
  const callback = useRefCache(onResize);
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const eventHandler = delegateEvent("resize", window, true, options);
    const handler = (event: Event): void => callback.current(event);
    eventHandler.add(handler);

    if (immediate && typeof window !== "undefined") {
      window.dispatchEvent(new UIEvent("resize"));
    }

    return () => {
      eventHandler.remove(handler);
    };
    // disabled since useRefCache for callback and don't want immediate to
    // re-trigger it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, enabled]);
}
