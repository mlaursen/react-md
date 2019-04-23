import { MutableRefObject, useCallback, useRef } from "react";

interface TempValue<T> {
  valueRef: MutableRefObject<T>;
  setValue: (nextValue: T) => void;
  resetValue: () => void;
}

/**
 * Creates a temporary value that gets reset every `x`ms back to the
 * provided default value. This is useful when doing keyboard searching
 * or other interactions.
 *
 * NOTE: This does not force a re-render when the value changes and instead
 * uses a ref value instead.
 *
 * @param defaultValue The default value to use. Each time the reset timeout
 * is triggered, this value will be set again.
 * @param resetTime The amount of time before the value is reset back to the
 * default value
 */
export default function useTempValue<T>(
  defaultValue: T,
  resetTime: number = 500
): TempValue<T> {
  const valueRef = useRef(defaultValue);
  const timeout = useRef<number | undefined>(undefined);

  const resetValue = useCallback(() => {
    window.clearTimeout(timeout.current);
    valueRef.current = defaultValue;
  }, []);

  const setValue = useCallback((nextValue: T) => {
    valueRef.current = nextValue;
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(resetValue, resetTime);
  }, []);

  return {
    valueRef,
    setValue,
    resetValue,
  };
}
