import { useCallback, HTMLAttributes } from "react";
import { useToggle, useRefCache } from "@react-md/utils";

type InputOrTextElement = HTMLInputElement | HTMLTextAreaElement;
interface Options
  extends Pick<HTMLAttributes<InputOrTextElement>, "onBlur" | "onFocus"> {}

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
  const handleFocus = useCallback<React.FocusEventHandler<InputOrTextElement>>(
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
