import { useState, useEffect } from "react";

/**
 * This hook is used to reset some value to the provided default value
 * if the value has not been changed again after `x` seconds.
 *
 * @param defaultValue The default value to use. Each time the reset timeout
 * is triggered, this value will be set again.
 * @param resetTime The amount of time before the value is reset back to the
 * default value
 */
export default function useResetValueTimeout<T>(
  defaultValue: T,
  resetTime: number = 500
) {
  const [value, setValue] = useState<T>(defaultValue);
  useEffect(() => {
    if (value === defaultValue) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setValue(defaultValue);
    }, resetTime);

    return () => {
      window.clearTimeout(timeout);
    };
  });

  return { value, setValue };
}
