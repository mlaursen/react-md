import { useEffect } from "react";

import { useRefCache } from "./useRefCache";
import { useToggle } from "./useToggle";

type Running = boolean;
type StartInterval = () => void;
type StopInterval = () => void;
type ReturnValue = [Running, StartInterval, StopInterval];

/**
 * Simple hook to use an interval with auto setup and teardown. The provided
 * functions will be guaranteed to not change and are memoized.
 *
 * @param callback - The callback function to call
 * @param delay - The time in milliseconds the timer should delay between
 * executions of the callback function
 * @param defaultRunning - Boolean if the interval should be started immediately
 * @returns a list containing a boolean if the interval is running, function to
 * start the interval, and a function to stop the interval.
 */
export function useInterval(
  callback: (stop: () => void) => void,
  delay: number,
  defaultRunning = false
): ReturnValue {
  const ref = useRefCache(callback);

  const [running, start, stop] = useToggle(defaultRunning);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval = window.setInterval(() => {
      ref.current(stop);
    }, delay);
    return () => {
      window.clearInterval(interval);
    };
    // disabled since useRefCache for the callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, running, stop]);

  return [running, start, stop];
}
