import { useCallback, useState } from "react";

type DefaultValue<T extends string> = T | (() => T);
type ReturnValue<T extends string> = [T, (nextValue: string) => void];

/**
 * This is a simple hook that will allow you to "strongly" type a `Select`
 * component's value since the `onChange` handler only returns a `string`.
 *
 * @param defaultValue - The default value to use
 * @returns an ordered list containing the current value followed by the
 * dispatch function to update the state.
 */
export function useSelectState<T extends string>(
  defaultValue: DefaultValue<T>
): ReturnValue<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const setTypedValue = useCallback((nextValue: string) => {
    setValue(nextValue as T);
  }, []);

  return [value, setTypedValue];
}
