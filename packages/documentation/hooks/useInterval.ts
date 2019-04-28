import { useEffect } from "react";

/**
 * Simple hook to use an interval with auto setup and teardown.
 *
 * @param delay The time in muilliseconds the timer should delay between executions
 * of the callback function
 * @param cb The callback function to call
 * @param enabled Boolean if the interval is currently enabled.
 */
export default function useInterval(
  delay: number,
  cb: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const interval = window.setInterval(cb, delay);
    return () => {
      window.clearInterval(interval);
    };
  }, [delay, cb, enabled]);
}
