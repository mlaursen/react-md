import { useCallback, useState } from "react";
import { useRefCache } from "@react-md/utils";

export type InputDefaultValue = string | (() => string);

type ChangeEventHandler = React.ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

/**
 *
 */
export default function useInputState(
  defaultValue: InputDefaultValue,
  propOnChange: ChangeEventHandler
) {
  const [value, setValue] = useState(defaultValue);
  const handlers = useRefCache({ propOnChange });

  const onChange = useCallback<ChangeEventHandler>(event => {
    const { propOnChange } = handlers.current;
    if (propOnChange) {
      propOnChange(event);
    }

    setValue(event.currentTarget.value);
  }, []);
  const reset = useCallback(() => {
    setValue("");
  }, []);
  const update = useCallback((nextValue: string) => {
    setValue(nextValue);
  }, []);

  return {
    value,
    reset,
    update,
    onChange,
  };
}
