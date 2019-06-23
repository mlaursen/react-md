import { useToggle, useRefCache } from "@react-md/utils";
import { useCallback, HTMLAttributes } from "react";

type TextElement = HTMLInputElement | HTMLTextAreaElement;

interface Options {
  onChange?: HTMLAttributes<TextElement>["onChange"];
  defaultValue: string;
}

/**
 * This is a small hook that will enable a valued flag when the value
 * of a text input or a textarea has a length greater than 0.
 *
 * @private
 */
export default function useValuedState({ onChange, defaultValue }: Options) {
  const handler = useRefCache(onChange);
  const { toggled: valued, enable, disable } = useToggle(
    defaultValue.length > 0
  );

  const handleChange = useCallback<React.ChangeEventHandler<TextElement>>(
    event => {
      const onChange = handler.current;
      if (onChange) {
        onChange(event);
      }

      if (event.currentTarget.value.length > 0) {
        enable();
      } else {
        disable();
      }
    },
    []
  );

  return { valued, onChange: handleChange };
}
