import { useEffect } from "react";
import useRefCache from "./useRefCache";
import useToggle from "./useToggle";

type Running = boolean;
type StartInterval = () => void;
type StopInterval = () => void;
type ReturnValue = [Running, StartInterval, StopInterval];

/**
 * Simple hook to use an interval with auto setup and teardown.
 *
 * @param callback The callback function to call
 * @param delay The time in milliseconds the timer should delay between executions
 * of the callback function
 * @param defaultRunning Boolean if the interval should be started immediately
 * @return an object containing functions to start and stop the interval
 */
export default function useInterval(
  callback: (stop: () => void) => void,
  delay: number,
  defaultRunning: boolean = false
): ReturnValue {
  const ref = useRefCache(callback);

  const { toggled: running, enable: start, disable: stop } = useToggle(
    defaultRunning
  );

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
  }, [delay, running]);

  return [running, start, stop];
}
