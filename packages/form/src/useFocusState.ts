import { useCallback, HTMLAttributes } from "react";
import { useToggle, useRefCache } from "@react-md/utils";

interface FocusState {
  id: string;
  defaultValue: string;
}

type TextElement = HTMLInputElement | HTMLTextAreaElement;

type FocusStateOptions = FocusState &
  Pick<HTMLAttributes<TextElement>, "onBlur" | "onFocus" | "onChange">;

export default function useFocusState({
  id,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
}: FocusStateOptions) {
  const handlers = useRefCache({ onFocus, onBlur, onChange });
  const {
    toggled: focused,
    enable: setFocused,
    disable: setBlurred,
  } = useToggle();
  const handleFocus = useCallback<React.FocusEventHandler<TextElement>>(
    event => {
      const { onFocus } = handlers.current;
      if (onFocus) {
        onFocus(event);
      }

      setFocused();
    },
    []
  );

  const handleBlur = useCallback(event => {
    const { onBlur } = handlers.current;
    if (onBlur) {
      onBlur(event);
    }

    setBlurred();
  }, []);

  const { toggled: valued, enable, disable } = useToggle(
    defaultValue.length > 0
  );
  const handleChange = useCallback<React.ChangeEventHandler<TextElement>>(
    event => {
      const { onChange } = handlers.current;
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

  return {
    focused,
    valued,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
  };
}
