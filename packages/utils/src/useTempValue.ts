import { MutableRefObject, useCallback, useRef } from "react";

type CurrentValueRef<T> = MutableRefObject<T>;
type SetValue<T> = (nextValue: T) => void;
type ResetValue = () => void;

type ReturnValue<T> = [CurrentValueRef<T>, SetValue<T>, ResetValue];

/**
 * Creates a temporary value that gets reset every `x`ms back to the provided
 * default value. This is useful when doing keyboard searching or other
 * interactions.
 *
 * NOTE: This does not force a re-render when the value changes and instead uses
 * a ref value instead.
 *
 * @typeParam T - the type for the value
 * @param defaultValue - The default value to use. Each time the reset timeout
 * is triggered, this value will be set again.
 * @param resetTime - The amount of time before the value is reset back to the
 * default value
 */
export function useTempValue<T>(
  defaultValue: T,
  resetTime = 500
): ReturnValue<T> {
  const value = useRef(defaultValue);
  const timeout = useRef<number>();
  const resetValue = useCallback(() => {
    window.clearTimeout(timeout.current);
    value.current = defaultValue;
  }, [defaultValue]);

  const setValue = useCallback(
    (nextValue: T) => {
      value.current = nextValue;
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(resetValue, resetTime);
    },
    [resetTime, resetValue]
  );

  return [value, setValue, resetValue];
}
