import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useRefCache } from "@react-md/utils";

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;
type DefaultValue =
  | string
  | number
  | string[]
  | (() => string | number | string[]);
type SetValue<T extends DefaultValue> = Dispatch<SetStateAction<T>>;

/**
 * This hooks is used to control the state of a radio group by storing providing the current
 * value and a change event handler that can be provided to each Radio in the group.
 *
 * @param defaultValue The default value for the radio group. If you want the user
 * to specifically choose a radio, set this to the empty string.
 * @param onChange An optional change event handler to also call when a radio's
 * onChange event is triggered.
 * @return a list containing the current value, a change event handler, and then a
 * manual value setter.
 */
export default function useRadioState<T extends DefaultValue = DefaultValue>(
  defaultValue: T,
  onChange?: ChangeEventHandler
): [T, ChangeEventHandler, SetValue<T>] {
  const [value, setValue] = useState<T>(defaultValue);
  const handler = useRefCache(onChange);
  const handleChange = useCallback<ChangeEventHandler>(event => {
    const propOnChange = handler.current;
    if (propOnChange) {
      propOnChange(event);
    }

    setValue(event.currentTarget.value as T);
  }, []);

  return [value, handleChange, setValue];
}
