import { useEffect, useRef } from "react";

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
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const callback = () => {
      ref.current();
    };

    const interval = window.setInterval(callback, delay);
    return () => {
      window.clearInterval(interval);
    };
  }, [delay, enabled]);
}
