import { useCallback, useEffect, useRef } from "react";
import useRefCache from "./useRefCache";
import useToggle from "./useToggle";

/**
 * Simple hook to use an timeout with auto setup and teardown.
 *
 * @param cb The callback function to call
 * @param delay The time in milliseconds the timer should delay between executions
 * of the callback function
 * @param defaultStarted Boolean if the timeout should be started immediately.
 * @return an object containing a function to reset the timer without disabling it
 * as well as another function to clear the timer immediately.
 */
export default function useTimeout(
  cb: () => void,
  delay: number,
  defaultStarted: boolean = false
) {
  const cbRef = useRefCache(cb);
  const timeoutRef = useRef<number>();
  const clearTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  }, []);
  const { toggled: enabled, enable: start, disable } = useToggle(
    defaultStarted
  );
  const stop = useCallback(() => {
    clearTimeout();
    disable();
  }, []);

  const { toggled, toggle } = useToggle();
  const restart = useCallback(() => {
    if (!enabled) {
      start();
    } else {
      toggle();
    }
  }, [enabled]);
  useEffect(() => {
    if (!enabled && !toggled) {
      return;
    }

    const callback = () => {
      cbRef.current();
      disable();
    };
    timeoutRef.current = window.setTimeout(callback, delay);
    return () => {
      clearTimeout();
    };
  }, [toggled, enabled, delay, disable]);

  return {
    start,
    stop,
    restart,
  };
}
