import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { withinRange } from "@react-md/utils";

import {
  ProvidedTextFieldMessageProps,
  ProvidedTextFieldProps,
  TextFieldHookOptions,
  useTextField,
} from "./useTextField";

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldConstraints {
  /**
   * An optional min value for the number field.
   */
  min?: number;

  /**
   * An optional max value for the number field.
   */
  max?: number;

  /**
   * An optional step amount to use.
   *
   * Note: The `min` and `max` values must be divisible by this value when any
   * are defined.
   */
  step?: number;
}

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedNumberFieldProps
  extends NumberFieldConstraints,
    ProvidedTextFieldProps {
  /**
   * Always set the `TextField` type to `number`.
   */
  type: "number";
}

/**
 * This is how the value within the text field should be "fixed" on blur. By
 * default, the value will not be fixed and continue to display an error if
 * there is an error.
 *
 * If this is set to `true`, the value will be updated to be within the `min`
 * and `max` values. Otherwise, setting this to `min` will only fix the minimum
 * value while `max` will only fix the maximum.
 *
 * @remarks \@since 2.5.0
 */
export type FixNumberOnBlur = boolean | "min" | "max";

/**
 * @remarks \@since 2.5.0
 */
export interface ProvidedNumberFieldMessageProps
  extends ProvidedNumberFieldProps,
    Pick<ProvidedTextFieldMessageProps, "messageProps"> {}

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldHookOptions
  extends Omit<TextFieldHookOptions, "defaultValue">,
    NumberFieldConstraints {
  /**
   * The default **number** value to use which can be a `number` or `undefined`.
   * When this value is set to a `number` (or a function that returns a
   * `number`), the returned value will never be `undefined`.
   */
  defaultValue?: number | (() => number | undefined);

  /**
   * @see {@link FixNumberOnBlur}
   */
  fixOnBlur?: FixNumberOnBlur;

  /**
   * Boolean if the `number` value should be updated as the user types instead
   * of only once the text field has been blurred.
   */
  updateOnChange?: boolean;
}

/**
 * @remarks \@since 2.5.0
 */
export interface NumberFieldHookControls {
  /**
   * Resets the `number` value to the `defaultValue` and clears any error
   * states.
   */
  reset(): void;
  setNumber: Dispatch<SetStateAction<number | undefined>>;
}

/**
 * An ordered list containing:
 * - the current `number` value of the field which will be updated based on the
 *   {@link NumberFieldHookOptions.updateOnChange} option
 *
 * @remarks \@since 2.5.0
 */
export type NumberFieldHookReturnType = [
  number | undefined,
  ProvidedNumberFieldProps | ProvidedNumberFieldMessageProps,
  NumberFieldHookControls
];

// all the overloads for the `useNumberField` -- not sure if there's an easier
// way to type these...

export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number);
    disableMessage: true;
  }
): [number, ProvidedNumberFieldProps, NumberFieldHookControls];
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number);
    disableMessage: false;
  }
): [number, ProvidedNumberFieldMessageProps, NumberFieldHookControls];
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: number | (() => number);
    disableMessage?: boolean;
  }
): [number, ProvidedNumberFieldMessageProps, NumberFieldHookControls];

export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage: true;
  }
): [number | undefined, ProvidedNumberFieldProps, NumberFieldHookControls];
export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage: false;
  }
): [
  number | undefined,
  ProvidedNumberFieldMessageProps,
  NumberFieldHookControls
];
export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage?: boolean;
  }
): [
  number | undefined,
  ProvidedNumberFieldMessageProps,
  NumberFieldHookControls
];

/**
 * This hook is used to control the value for the `TextField` component acting
 * as an `<input type="number">` and ensuring that a "valid" `number` is
 * available. There is also built-in support for using the validity
 * api/constraint validation so that real-time errors can be presented to the
 * user as they type along with the `FormMessage` component.
 *
 * Simple example:
 *
 * ```tsx
 * const [value, fieldProps] = useNumberField({
 *   id: 'field-id',
 *   min: 0,
 *   max: 10,
 *   defaultValue: 0,
 *   disableMessage: true,
 * });
 *
 * return <TextField {...fieldProps} label="Label" placeholder="0" />;
 * ```
 *
 * Step example and messaging:
 *
 * ```tsx
 * const [value, fieldProps] = useNumberField({
 *   id: 'field-id',
 *   min: 0,
 *   max: 10,
 *   step: 2,
 *   defaultValue: 0,
 * });
 *
 * return <TextFieldWithMessage {...fieldProps} label="Label" placeholder="0" />;
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * @see {@link useTextField}
 * @param options - All the options used to control the functionality of this
 * hook.
 * @returns @see {@link NumberFieldHookReturnType}
 * @remarks \@since 2.5.0
 */
export function useNumberField({
  id,
  defaultValue,
  theme,
  pattern,
  required,
  minLength,
  maxLength,
  disableMaxLength = false,
  onBlur,
  onChange,
  helpText,
  errorIcon,
  counter = false,
  disableMessage = false,
  validateOnChange = "number-recommended",
  isErrored,
  onErrorChange,
  getErrorIcon,
  getErrorMessage,
  min,
  max,
  step,
  fixOnBlur = true,
  updateOnChange = true,
}: NumberFieldHookOptions): NumberFieldHookReturnType {
  const [number, setNumber] = useState(defaultValue);
  const initial = useRef(number);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(event);
      }

      if (event.isPropagationStopped()) {
        return;
      }

      const input = event.currentTarget;
      input.setCustomValidity("");
      input.checkValidity();
      if (
        !fixOnBlur ||
        // do nothing else since it's a weird value like: `"--0"` which causes
        // the value to be `""` and `numberAsValue` to be `NaN`
        input.validity.badInput ||
        (input.validity.rangeUnderflow && fixOnBlur === "max") ||
        (input.validity.rangeOverflow && fixOnBlur === "min")
      ) {
        return;
      }

      let value = input.valueAsNumber;
      if (input.value === "" && typeof initial.current === "number") {
        value = min ?? initial.current;
      }

      // can't have both rangeUnderflow and rangeOverflow at the same time, so
      // it's "safe" to always provide both
      value = withinRange(value, min, max);
      if (!Number.isNaN(value)) {
        setNumber(value);
        input.value = `${value}`;
      } else if (typeof initial.current === "undefined") {
        setNumber(undefined);
      }
    },
    [onBlur, fixOnBlur, min, max]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if (event.isPropagationStopped() || !updateOnChange) {
        return;
      }

      const input = event.currentTarget;
      input.checkValidity();
      const value = withinRange(event.currentTarget.valueAsNumber, min, max);
      if (
        !input.validity.valid &&
        !input.validity.rangeUnderflow &&
        !input.validity.rangeOverflow
      ) {
        return;
      }

      if (!Number.isNaN(value)) {
        setNumber(value);
      } else if (initial.current === undefined) {
        setNumber(undefined);
      }
    },
    [onChange, updateOnChange, min, max]
  );

  const [, props, { setState }] = useTextField({
    id,
    defaultValue: `${number ?? ""}`,
    theme,
    pattern,
    required,
    minLength,
    maxLength,
    disableMaxLength,
    onBlur: handleBlur,
    onChange: handleChange,
    helpText,
    errorIcon,
    counter,
    disableMessage,
    validateOnChange,
    isErrored,
    onErrorChange,
    getErrorIcon,
    getErrorMessage,
  });

  const reset = useCallback(() => {
    setNumber(initial.current);
    setState({
      value: `${initial.current ?? ""}`,
      error: false,
      errorMessage: "",
    });
  }, [setState]);

  const updateNumber = useCallback<
    Dispatch<SetStateAction<number | undefined>>
  >(
    (value) => {
      if (typeof value === "function") {
        setNumber((prevNumber) => {
          const updated = value(prevNumber);
          setState((prevState) => ({
            ...prevState,
            value: `${updated ?? ""}`,
          }));

          return updated;
        });
        return;
      }

      setNumber(value);
      setState((prevState) => ({
        ...prevState,
        value: `${value ?? ""}`,
      }));
    },
    [setState]
  );

  return [
    number,
    { ...props, min, max, step, type: "number" },
    {
      reset,
      setNumber: updateNumber,
    },
  ];
}
