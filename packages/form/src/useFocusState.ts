import { useCallback, HTMLAttributes } from "react";
import { useToggle, useRefCache } from "@react-md/utils";

type FocusElement = HTMLInputElement | HTMLTextAreaElement | HTMLLabelElement;
type BlurEventHandler = React.FocusEventHandler<FocusElement>;
type FocusEventHandler = React.FocusEventHandler<FocusElement>;

interface Options
  extends Pick<HTMLAttributes<FocusElement>, "onBlur" | "onFocus"> {}

/**
 * @private
 */
export default function useFocusState({
  onFocus,
  onBlur,
}: Options): [boolean, FocusEventHandler, BlurEventHandler] {
  const handlers = useRefCache({ onFocus, onBlur });
  const {
    toggled: focused,
    enable: setFocused,
    disable: setBlurred,
  } = useToggle(false);

  const handleFocus = useCallback<FocusEventHandler>(event => {
    const { onFocus } = handlers.current;
    if (onFocus) {
      onFocus(event);
    }

    setFocused();
  }, []);

  const handleBlur = useCallback<BlurEventHandler>(event => {
    const { onBlur } = handlers.current;
    if (onBlur) {
      onBlur(event);
    }

    setBlurred();
  }, []);

  return [focused, handleFocus, handleBlur];
}
