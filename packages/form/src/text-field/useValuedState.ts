import { FocusEvent, FocusEventHandler, useCallback } from "react";
import { useRefCache, useToggle } from "@react-md/utils";

type TextElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type Value = string | number | (string | number)[];
type ChangeEventHandler<T extends TextElement> = React.ChangeEventHandler<T>;

interface Options<T extends TextElement> {
  onBlur?: FocusEventHandler<T>;
  onChange?: ChangeEventHandler<T>;
  value?: Value;
  defaultValue?: Value;
}

/**
 * This is a small hook that will enable a valued flag when the value
 * of a text input or a textarea has a length greater than 0.
 *
 * @private
 */
export function useValuedState<T extends TextElement>({
  onBlur,
  onChange,
  value,
  defaultValue,
}: Options<T>): [boolean, ChangeEventHandler<T>, FocusEventHandler<T>] {
  const handler = useRefCache(onChange);
  const [valued, enable, disable] = useToggle(() => {
    if (typeof value === "undefined") {
      return (
        typeof defaultValue === "number" || (defaultValue || "").length > 0
      );
    }

    if (typeof value === "string") {
      return value.length > 0;
    }

    return typeof value === "number";
  });

  const handleChange = useCallback<React.ChangeEventHandler<T>>(
    (event) => {
      const onChange = handler.current;
      if (onChange) {
        onChange(event);
      }

      const input = event.currentTarget;
      if (input.getAttribute("type") === "number") {
        input.checkValidity();
        if (input.validity.badInput) {
          return;
        }
      }

      if (input.value.length > 0) {
        enable();
      } else {
        disable();
      }
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enable, disable]
  );

  // This is **really** only for TextField components and the input
  // type="number". When there is a badInput, a change event does not get fired
  // again once it is "fixed" or emptied.
  const handleBlur = useCallback(
    (event: FocusEvent<T>) => {
      if (onBlur) {
        onBlur(event);
      }

      const input = event.currentTarget;
      if (input.getAttribute("type") === "number") {
        input.checkValidity();
        if (input.validity.badInput || input.value.length > 0) {
          return;
        }

        disable();
      }
    },
    [onBlur, disable]
  );

  return [valued, handleChange, handleBlur];
}
