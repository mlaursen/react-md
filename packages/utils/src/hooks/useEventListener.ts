import { useEffect } from "react";
import { DelegatedEventHandler, delegateEvent } from "../delegateEvent";

export interface EventListenerOptions extends AddEventListenerOptions {
  enabled?: boolean;
  delegate?: boolean;
  throttle?: boolean;
  shouldUpdate?: any[];
}

/**
 * A hook that to attach a window event listener when a component mounts and
 * then remove it when the component unmounts.
 *
 * The default behavior is to ONLY run the effect phases on component mount and
 * unmount. You can provide a list of values that will trigger the effect phases
 * when their values change.
 */
export default function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options: EventListenerOptions = {}
) {
  const {
    shouldUpdate = [],
    throttle,
    delegate,
    enabled = true,
    ...opts
  } = options;
  return useEffect(() => {
    if (!enabled) {
      return;
    }

    let eventHandler: DelegatedEventHandler;
    if (throttle || delegate) {
      eventHandler = delegateEvent(type, window, throttle, opts);
      eventHandler.add(handler);
    } else {
      window.addEventListener(type, handler, opts);
    }

    return () => {
      if (eventHandler) {
        eventHandler.remove(handler);
      } else {
        window.removeEventListener(type, handler, opts);
      }
    };
  }, [throttle, enabled, ...shouldUpdate]);
}
