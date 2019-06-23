import { ChangeEventHandler, useState, useCallback } from "react";
import { useRefCache } from "@react-md/utils";

/**
 * A small hook that can be used for controlling the state of a checkbox or radio
 * component.
 *
 * @param defaultChecked Boolean if the input should be checked by default. Changing
 * this value will not update the state after initial render.
 * @param onChange An optional change event handler to also call when the checked state
 * changes.
 */
export default function useInputToggle(
  defaultChecked: boolean,
  onChange?: ChangeEventHandler<HTMLInputElement>
) {
  const [checked, setChecked] = useState(defaultChecked);
  const mergable = useRefCache(onChange);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      const propOnChange = mergable.current;
      if (propOnChange) {
        propOnChange(event);
      }

      setChecked(event.currentTarget.checked);
    },
    []
  );

  return {
    checked,
    onChange: handleChange,
    setChecked,
  };
}
