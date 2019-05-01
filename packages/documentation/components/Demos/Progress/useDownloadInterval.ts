import { useState } from "react";
import { useInterval } from "@react-md/utils";

/*
 * A reusable hook to handle the progress examples for both the linear and circular
 * progress bars with an incremental interval.
 */
export function useDownloadInterval(delay: number = 100) {
  const [value, setValue] = useState(0);
  const { start, running } = useInterval(stop => {
    const nextValue = Math.min(100, value + 1);
    if (value === nextValue) {
      stop();
    } else {
      setValue(nextValue);
    }
  }, delay);

  return {
    value,
    start,
    running,
  };
}
