import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEvent,
  FocusEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";

/**
 * @internal
 * @remarks \@since 2.5.2
 */
type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface EventHandlers<E extends FormElement> {
  onBlur?: FocusEventHandler<E>;
  onFocus?: FocusEventHandler<E>;
  onChange?: ChangeEventHandler<E>;
}

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface FieldStatesOptions<E extends FormElement> extends EventHandlers<E> {
  value?: string | string[];
  defaultValue?: string | string[];
}

/**
 * @internal
 * @remarks \@since 2.5.2
 */
interface ReturnValue<E extends FormElement>
  extends Required<EventHandlers<E>> {
  /**
   * Boolean if the TextField or TextArea current has a value with a `length > 0`
   * so that any labels will correctly float above the text field. This will
   * also make sure that number inputs will still be considered valued when
   * there is a `badInput` validity error.
   */
  valued: boolean;

  /**
   * Boolean if the TextField or TextArea currently has focus.
   */
  focused: boolean;
}

/**
 * This hook is used to handle the different states for the text field based on
 * the current value and user interaction.
 *
 * @internal
 * @remarks \@since 2.5.2
 */
export function useFieldStates<E extends FormElement>({
  onBlur,
  onFocus,
  onChange,
  value,
  defaultValue,
}: FieldStatesOptions<E>): ReturnValue<E> {
  const [focused, setFocused] = useState(false);
  const [valued, setValued] = useState(() => {
    if (typeof value === "undefined") {
      return typeof defaultValue !== "undefined" && defaultValue.length > 0;
    }

    return value.length > 0;
  });

  const handleBlur = useCallback(
    (event: FocusEvent<E>) => {
      if (onBlur) {
        onBlur(event);
      }

      setFocused(false);
      const input = event.currentTarget;
      if (input.getAttribute("type") === "number") {
        input.checkValidity();
        setValued(input.validity.badInput || (value ?? input.value).length > 0);
      }
    },
    [onBlur, value]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<E>) => {
      if (onFocus) {
        onFocus(event);
      }

      setFocused(true);
    },
    [onFocus]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<E>) => {
      if (onChange) {
        onChange(event);
      }

      const input = event.currentTarget;
      if (input.getAttribute("type") === "number") {
        input.checkValidity();
        /* istanbul ignore next */
        if (input.validity.badInput) {
          return;
        }
      }

      setValued(input.value.length > 0);
    },
    [onChange]
  );

  // another way to handle this could be to just make the `valued` state derived
  // based on the `value`, but it gets wonky for number fields. This technically
  // still fails right now for number fields if you don't use the
  // `useNumberField` hook since the `value` will be set back to the empty
  // string on invalid numbers.
  const prevValue = useRef(value);
  if (prevValue.current !== value && typeof value === "string") {
    prevValue.current = value;
    setValued(value.length > 0);
  }

  return {
    valued,
    focused,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
  };
}
