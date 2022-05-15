import { useCallback, useEffect, useRef } from "react";

import { useRefCache } from "./useRefCache";
import { useToggle } from "./useToggle";

type StartTimeout = () => void;
type StopTimeout = () => void;
type RestartTimeout = () => void;
type ReturnValue = [StartTimeout, StopTimeout, RestartTimeout];

/**
 * Simple hook to use an timeout with auto setup and teardown. The provided
 * functions will be guaranteed to not change and are memoized.
 *
 * @param cb - The callback function to call
 * @param delay - The time in milliseconds the timer should delay between
 * executions of the callback function
 * @param defaultStarted - Boolean if the timeout should be started immediately.
 * @returns a list containing a function to start the timeout, a function to
 * stop the timeout, and a function to restart the timeout.
 */
export function useTimeout(
  cb: () => void,
  delay: number,
  defaultStarted: boolean | (() => boolean) = false
): ReturnValue {
  const cbRef = useRefCache(cb);
  const delayRef = useRefCache(delay);
  const timeoutRef = useRef<number>();
  const [enabled, start, disable] = useToggle(defaultStarted);

  const clearTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  // these are all guaranteed to not change since using refs or non-updating
  // callbacks
  const restart = useCallback(() => {
    clearTimeout();
    timeoutRef.current = window.setTimeout(() => {
      cbRef.current();
      disable();
    }, delayRef.current);
  }, []);

  const stop = useCallback(() => {
    clearTimeout();
    disable();
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      cbRef.current();
      disable();
    }, delay);
    return () => {
      clearTimeout();
    };
  }, [enabled, delay, disable]);

  return [start, stop, restart];
}
