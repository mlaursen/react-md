"use client";
import { useCallback, useRef, useState } from "react";
import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import { withinRange } from "../utils/withinRange.js";
import {
  useTextField,
  type ProvidedTextFieldMessageProps,
  type ProvidedTextFieldProps,
  type TextFieldHookOptions,
  type TextFieldHookState,
  type TextFieldImplementation,
  type ValidatedTextFieldImplementation,
} from "./useTextField.js";

const noop = (): void => {
  // do nothing
};

/** @remarks \@since 2.5.0 */
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
 * @remarks
 * \@since 2.5.0
 * \@since 6.0.0
 * - Removed `updateOnChange` in favor of `updateValue`
 * - Renamed `fixOnBlur` to `updateValueOnBlur`
 */
export interface NumberFieldHookOptions
  extends Omit<
      TextFieldHookOptions<HTMLInputElement>,
      "defaultValue" | "isNumber"
    >,
    NumberFieldConstraints {
  /**
   * @defaultValue `undefined`
   */
  defaultValue?: UseStateInitializer<number>;

  /**
   * This controls the behavior for the `value` returned by this hook. If you
   * need access to the current value immediately as the user types to update
   * other components, keep this as the default of `"change"`. Otherwise, set
   * this to `"blur"`.
   *
   * @example
   * Deferring Updates on Blur
   * ```tsx
   * import { TextField, useNumberField } from "@react-md/core";
   * import type { ReactElement } from "react";
   *
   * function Example(): ReactElement {
   *   const { fieldProps, value } = useNumberField({
   *     min: 0,
   *     max: 100,
   *     name: "someName",
   *     defaultValue: 0,
   *     updateValue: "blur",
   *   });
   *
   *   const result = useMemo(() => someExpensiveComputation(value), [value]);
   *
   *   return <TextField {...fieldProps} label="Label" />;
   * }
   * ```
   *
   * @defaultValue `"change"`
   */
  updateValue?: "blur" | "change";

  /**
   * This option is used to update the `number` value and text field value to be
   * within the `min` and `max` range or just format the text field value when
   * the input is blurred. This update will only be applied if the text field
   * contains a valid number. Using `min = 0` and `max = 10`:
   *
   * | text value | updated value |
   * | ---------- | ------------- |
   * | 000001     | 1             |
   * | -1         | 0             |
   * | 20         | 10            |
   * | -12        | 0             |
   * | --1        | --1           |
   * | fjdka      | fjdka         |
   *
   *
   * Set this to `false` if no changed should be applied and force the user to
   * fix any min/max errors manually and maintain weird formatting.
   *
   * @defaultValue `true`
   * @remarks \@since 6.0.0 This was renamed from `fixOnBlur` and removed the
   * `"min"` and `"max"` behavior.
   */
  updateValueOnBlur?: boolean;
}

/** @remarks \@since 6.0.0 */
export interface NumberFieldHookState
  extends Omit<TextFieldHookState, "value"> {
  value: number | undefined;
}

/** @remarks \@since 2.5.6 */
export interface ProvidedNumberFieldProps
  extends ProvidedTextFieldProps<HTMLInputElement>,
    NumberFieldConstraints {
  type: "number";
}

/** @remarks \@since 2.5.6 */
export interface ProvidedNumberFieldMessageProps
  extends ProvidedTextFieldMessageProps<HTMLInputElement>,
    NumberFieldConstraints {
  type: "number";
}

/** @remarks \@since 6.0.0 */
export interface NumberFieldImplementation
  extends Omit<
    TextFieldImplementation<HTMLInputElement>,
    "value" | "setState"
  > {
  value: number | undefined;
  setState: UseStateSetter<NumberFieldHookState>;
  fieldProps: ProvidedNumberFieldProps;
}

/** @remarks \@since 6.0.0 */
export interface NumberFieldWithMessageImplementation
  extends NumberFieldImplementation {
  fieldProps: ProvidedNumberFieldMessageProps;
}

/** @remarks \@since 6.0.0 */
export interface ValidatedNumberFieldImplementation
  extends Omit<
    ValidatedTextFieldImplementation<HTMLInputElement>,
    "value" | "setState"
  > {
  value: number | undefined;
  setState: UseStateSetter<NumberFieldHookState>;
  fieldProps: ProvidedNumberFieldProps | ProvidedNumberFieldMessageProps;
}

/**
 * @example
 * Enforce Number Value and No Error Messages
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     min: 0,
 *     max: 100,
 *     name: "someName",
 *     defaultValue: 0,
 *     disableMessage: true,
 *   });
 *
 *   // this is safe since `value` will always be a number even if there is a
 *   // validation error. since the min and max options were provided as well,
 *   // number will be between that range as well.
 *   const computed = value * 10;
 *
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 *
 * @see {@link useTextField}
 * @see {@link useNumberField} overrides for other examples.
 * ```
 */
export function useNumberField(
  options: NumberFieldHookOptions & {
    disableMessage: true;
    defaultValue: UseStateInitializer<number>;
  }
): NumberFieldImplementation & {
  value: number;
  setState: UseStateSetter<NumberFieldHookState & { value: number }>;
};

/**
 * @example
 * No Error Messages
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     min: 0,
 *     max: 100,
 *     name: "someName",
 *     disableMessage: true,
 *   });
 *
 *   // `value` will be `undefined` until the user enters a valid value once
 *   // there is a valid value, `value` will be a `number`. So this might cause
 *   // `computed` to be `NaN | number`
 *   //
 *   // const computed = value * 10;
 *
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 * ```
 *
 * @see {@link useTextField}
 * @see {@link useNumberField} overrides for other examples.
 */
export function useNumberField(
  options: NumberFieldHookOptions & { disableMessage: true }
): NumberFieldImplementation;

/**
 * @example
 * Enforce Number Value
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     min: 0,
 *     max: 100,
 *     name: "someName",
 *     defaultValue: 0,
 *   });
 *
 *   // this is safe since `value` will always be a number even if there is a
 *   // validation error. since the min and max options were provided as well,
 *   // number will be between that range as well.
 *   const computed = value * 10;
 *
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 * ```
 *
 * @example
 * Enforce Number Value and Deferring Updates
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     min: 0,
 *     max: 100,
 *     name: "someName",
 *     defaultValue: 0,
 *     updateValue: "blur",
 *   });
 *
 *   // the `value` will only be updated whenever the `TextField` is blurred.
 *   // This is helpful if the `value` is used in expensive computations or
 *   // updates that do not need to be updated as the user types
 *   const computed = value * 10;
 *
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 * ```
 *
 * @see {@link useTextField}
 * @see {@link useNumberField} overrides for other examples.
 */
export function useNumberField(
  options: NumberFieldHookOptions & {
    defaultValue: UseStateInitializer<number>;
  }
): NumberFieldWithMessageImplementation & {
  value: number;
  setState: UseStateSetter<NumberFieldHookState & { value: number }>;
};

/**
 * The `useNumberField` hook is used to control the state of a `TextField` or
 * `<input type="number">`
 *
 * @example
 * Default Implementation
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     name: "someName",
 *   });
 *
 *   // `value` will be `undefined` until the user enters a valid value once
 *   // there is a valid value, `value` will be a `number`. So this might cause
 *   // `computed` to be `NaN | number`
 *   //
 *   // const computed = value * 10;
 *
 *   // whenever there is an error, an error message will be displayed below the
 *   // `TextField`
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 * ```
 *
 * @example
 * Adding Constraints
 * ```tsx
 * import { TextField, useNumberField } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { fieldProps, value } = useNumberField({
 *     name: "someName",
 *     min: 0,
 *     max: 100,
 *     step: 2,
 *     required: true,
 *   });
 *
 *   return <TextField {...fieldProps} label="Label" />;
 * }
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
 * @see {@link useTextField}
 */
export function useNumberField(
  options: NumberFieldHookOptions
): NumberFieldWithMessageImplementation;

/**
 * @internal
 * @see {@link useTextField}
 * @see {@link useNumberField} overrides for other examples.
 */
export function useNumberField(
  options: NumberFieldHookOptions
): ValidatedNumberFieldImplementation {
  const {
    min,
    max,
    step,
    onBlur = noop,
    onChange = noop,
    updateValue = "change",
    updateValueOnBlur = true,
    defaultValue,
    ...textOptions
  } = options;

  const [number, setNumber] = useState(defaultValue);
  const initial = useRef(number);
  const {
    value: _value,
    reset: resetTextField,
    fieldProps,
    setState: setTextFieldState,
    ...remaining
  } = useTextField({
    ...textOptions,
    isNumber: true,
    defaultValue: `${number ?? ""}`,
    onBlur(event) {
      onBlur(event);
      if (event.isPropagationStopped()) {
        return;
      }

      const input = event.currentTarget;
      input.setCustomValidity("");
      input.checkValidity();
      if (
        !updateValueOnBlur ||
        // do nothing else since it's a weird value like: `"--0"` which causes
        // the value to be `""` and `numberAsValue` to be `NaN`
        input.validity.badInput
      ) {
        return;
      }

      let value = input.valueAsNumber;
      if (input.value === "" && typeof initial.current === "number") {
        value = min ?? initial.current;
      }

      // can't have both rangeUnderflow and rangeOverflow at the same time, so
      // it's "safe" to always provide both
      value = withinRange({ min, max, value });
      if (!Number.isNaN(value)) {
        setNumber(value);
        input.value = `${value}`;
      } else if (typeof initial.current === "undefined") {
        setNumber(undefined);
      }
    },
    onChange(event) {
      onChange(event);
      if (event.isPropagationStopped() || updateValue === "blur") {
        return;
      }

      const input = event.currentTarget;
      input.checkValidity();
      const value = withinRange({
        min,
        max,
        value: event.currentTarget.valueAsNumber,
      });
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
  });

  const reset = useCallback(() => {
    resetTextField();
    setNumber(initial.current);
  }, [resetTextField]);
  const setState = useCallback<UseStateSetter<NumberFieldHookState>>(
    (nextState) => {
      if (typeof nextState === "function") {
        setNumber((prevNumber) => {
          let nextNumber: number | undefined = prevNumber;
          setTextFieldState((prevState) => {
            const updated = nextState({
              ...prevState,
              value: prevNumber,
            });

            nextNumber = updated.value;

            return {
              ...updated,
              value: `${nextNumber ?? ""}`,
            };
          });

          return nextNumber;
        });
        return;
      }

      const { value, error, errorMessage } = nextState;
      setNumber(value);
      setTextFieldState({
        value: `${value ?? ""}`,
        error,
        errorMessage,
      });
    },
    [setTextFieldState]
  );

  return {
    ...remaining,
    reset,
    value: number,
    setState,
    fieldProps: {
      ...fieldProps,
      min,
      max,
      step,
      type: "number",
    },
  };
}
