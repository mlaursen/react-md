import { useCallback, HTMLAttributes } from "react";
import { useToggle, useRefCache } from "@react-md/utils";

type FocusElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLLabelElement
  | HTMLSelectElement;
type BlurEventHandler = React.FocusEventHandler<FocusElement>;
type FocusEventHandler = React.FocusEventHandler<FocusElement>;

type Options = Pick<HTMLAttributes<FocusElement>, "onBlur" | "onFocus">;

/**
 * @private
 */
export default function useFocusState({
  onFocus,
  onBlur,
}: Options): [boolean, FocusEventHandler, BlurEventHandler] {
  const handlers = useRefCache({ onFocus, onBlur });
  const [focused, setFocused, setBlurred] = useToggle(false);

  const handleFocus = useCallback<FocusEventHandler>(
    event => {
      const { onFocus } = handlers.current;
      if (onFocus) {
        onFocus(event);
      }

      setFocused();
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFocused]
  );

  const handleBlur = useCallback<BlurEventHandler>(
    event => {
      const { onBlur } = handlers.current;
      if (onBlur) {
        onBlur(event);
      }

      setBlurred();
    },
    // disabled since useRefCache
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setBlurred]
  );

  return [focused, handleFocus, handleBlur];
}
