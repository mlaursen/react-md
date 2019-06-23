import { useCallback, HTMLAttributes } from "react";
import { useToggle, useRefCache } from "@react-md/utils";

type FocusElement = HTMLInputElement | HTMLTextAreaElement | HTMLLabelElement;

interface Options
  extends Pick<HTMLAttributes<FocusElement>, "onBlur" | "onFocus"> {}

/**
 * @private
 */
export default function useFocusState({ onFocus, onBlur }: Options) {
  const handlers = useRefCache({ onFocus, onBlur });
  const {
    toggled: focused,
    enable: setFocused,
    disable: setBlurred,
  } = useToggle();
  const handleFocus = useCallback<React.FocusEventHandler<FocusElement>>(
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

  return {
    focused,
    onBlur: handleBlur,
    onFocus: handleFocus,
  };
}
