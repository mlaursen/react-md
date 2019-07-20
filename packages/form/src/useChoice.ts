import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useRefCache } from "@react-md/utils";

type InputElement = HTMLInputElement | HTMLSelectElement;
type ChangeEventHandler<E extends InputElement> = React.ChangeEventHandler<E>;
type DefaultValue =
  | string
  | number
  | string[]
  | (() => string | number | string[]);
type SetValue<T extends DefaultValue> = Dispatch<SetStateAction<T>>;

/**
 * This hook can be used with a radio group or a select element
 *
 * @param defaultValue The default value. If you want the user to specifically choose
 * a value, set this to the empty string.
 * @param onChange An optional change event handler to also call when the change event
 * is triggered.
 * @return a list containing the current value, a change event handler, and then a
 * manual value setter.
 */
export default function useChoice<
  T extends DefaultValue = DefaultValue,
  E extends InputElement = InputElement
>(
  defaultValue: T,
  onChange?: ChangeEventHandler<E>
): [T, ChangeEventHandler<E>, SetValue<T>] {
  const [value, setValue] = useState<T>(defaultValue);
  const handler = useRefCache(onChange);
  const handleChange = useCallback<ChangeEventHandler<E>>(event => {
    const propOnChange = handler.current;
    if (propOnChange) {
      propOnChange(event);
    }

    setValue(event.currentTarget.value as T);
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, handleChange, setValue];
}
