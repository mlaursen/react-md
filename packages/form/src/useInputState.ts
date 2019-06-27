import { useCallback, useState, Dispatch, SetStateAction } from "react";
import { useRefCache } from "@react-md/utils";

type DefaultValue = string | (() => string);
type ChangeEventHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;
type ResetValue = () => void;
type SetValue = Dispatch<SetStateAction<string>>;

/**
 * A small hook that can be used for controlling the state of a `TextField` or `TextArea`'s
 * value.
 *
 * @param defaultValue The default value to use for the input/textarea. Changing
 * this value will not update the value after initial render.
 * @param onChange An optional change event handler to also call when the value
 * changes.
 * @return a list containing the current value, a change event handler, a reset function
 * to the `defaultValue`, and a `setValue` function.
 */
export default function useInputState(
  defaultValue: DefaultValue,
  onChange?: ChangeEventHandler
): [string, ChangeEventHandler, ResetValue, SetValue] {
  const [value, setValue] = useState(defaultValue);
  const handlers = useRefCache({ onChange });

  const handleChange = useCallback<ChangeEventHandler>(event => {
    const { onChange } = handlers.current;
    if (onChange) {
      onChange(event);
    }

    setValue(event.currentTarget.value);
  }, []);
  const reset = useCallback(() => {
    setValue(defaultValue);
  }, []);

  return [value, handleChange, reset, setValue];
}
