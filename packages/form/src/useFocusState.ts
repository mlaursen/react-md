import { HTMLAttributes, useCallback } from "react";
import { useToggle } from "@react-md/utils";

type FocusElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLLabelElement
  | HTMLSelectElement
  | HTMLDivElement;
type BlurEventHandler = React.FocusEventHandler<FocusElement>;
type FocusEventHandler = React.FocusEventHandler<FocusElement>;

type Options = Pick<HTMLAttributes<FocusElement>, "onBlur" | "onFocus">;

/**
 * @internal
 */
export function useFocusState({
  onFocus,
  onBlur,
}: Options): [boolean, FocusEventHandler, BlurEventHandler] {
  const [focused, setFocused, setBlurred] = useToggle(false);

  const handleFocus = useCallback<FocusEventHandler>(
    (event) => {
      if (onFocus) {
        onFocus(event);
      }

      setFocused();
    },
    [setFocused, onFocus]
  );

  const handleBlur = useCallback<BlurEventHandler>(
    (event) => {
      if (onBlur) {
        onBlur(event);
      }

      setBlurred();
    },
    [setBlurred, onBlur]
  );

  return [focused, handleFocus, handleBlur];
}
