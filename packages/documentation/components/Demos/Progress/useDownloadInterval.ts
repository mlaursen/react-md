import { useState, useCallback } from "react";
import { useToggle, useInterval } from "@react-md/utils";

/*
 * A reusable hook to handle the progress examples for both the linear and circular
 * progress bars with an incremental interval.
 */
export function useDownloadInterval(delay: number = 100) {
  const { toggled, enable, disable } = useToggle();
  const [value, setValue] = useState(0);

  const start = useCallback(() => {
    setValue(0);
    enable();
  }, []);

  const update = useCallback(() => {
    setValue(prevValue => {
      const nextValue = Math.min(100, prevValue + 1);
      if (nextValue === prevValue) {
        disable();
      }

      return nextValue;
    });
  }, []);
  useInterval(delay, update, toggled);

  return {
    value,
    start,
    running: toggled,
  };
}
