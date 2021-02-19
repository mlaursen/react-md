import { Dispatch, SetStateAction, useCallback, useState } from "react";

type ChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;
type SetChecked = Dispatch<SetStateAction<boolean>>;

/**
 * A small hook that can be used for controlling the state of a single Checkbox
 * component.
 *
 * @param defaultChecked - Boolean if the input should be checked by default.
 * Changing this value will not update the state after initial render.
 * @param onChange - An optional change event handler to also call when the
 * checked state changes.
 * @returns a list containing the checked state, a change event handler, and
 * then a manual set checked action.
 */
export function useChecked(
  defaultChecked: boolean | (() => boolean),
  onChange?: ChangeEventHandler
): [boolean, ChangeEventHandler, SetChecked] {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = useCallback<ChangeEventHandler>(
    (event) => {
      if (onChange) {
        onChange(event);
      }

      setChecked(event.currentTarget.checked);
    },
    [onChange]
  );

  return [checked, handleChange, setChecked];
}
