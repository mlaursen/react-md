"use client";

import { type InputHTMLAttributes, useRef } from "react";

import {
  type ProvidedFormMessageProps,
  type ProvidedTextFieldProps,
  type TextFieldHookOptions,
  type TextFieldImplementation,
  type TextFieldWithMessageImplementation,
  useTextField,
} from "../form/useTextField.js";
import { type TimeFieldStepOptions, getTimeStep } from "./utils.js";

/** @since 6.3.0 */
export interface TimeFieldConstraints {
  /**
   * This **must** be in the format `HH:mm`:
   * - `00:30` (12:30 AM)
   * - `15:15` (03:15 PM)
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time#time_value_format | Time value format}
   */
  min?: string;

  /**
   * This **must** be in the format `HH:mm`:
   * - `00:30` (12:30 AM)
   * - `15:15` (03:15 PM)
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time#time_value_format | Time value format}
   */
  max?: string;

  /**
   * For time inputs, the value of step is given in seconds, with a scaling
   * factor of 1000 (since the underlying numeric value is in milliseconds).
   * The default value of step is 60, indicating 60 seconds (or 1 minute, or
   * 60,000 milliseconds).
   *
   * When any is set as the value for step, the default 60 seconds is used, and
   * the seconds value is not displayed in the UI.
   *
   * Here are a few examples:
   *
   * - `15`   -&gt; 15 seconds
   * - `60`   -&gt; 1 minute
   * - `900`  -&gt; 15 minutes
   * - `3600` -&gt; 1 hour
   *
   * Since this might be a bit confusing, the values can be provided in an
   * object instead:
   *
   * ```ts
   * { seconds: 30 }
   * { minutes: 1 }
   * { minutes: 15 }
   * { hours: 1 }
   * { seconds: 15, minutes: 30, hours: 1 }
   * ```
   *
   * NOTE: The `min` and `max` props **must** be provided as well for the
   * `step` to work.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time#step | step attribute}
   */
  step?: number | "any" | TimeFieldStepOptions;
}

/** @since 6.3.0 */
export interface TimeFieldOptions
  extends
    Omit<
      TextFieldHookOptions,
      | "isNumber"
      | "counter"
      | "pattern"
      | "maxLength"
      | "minLength"
      | "disableMaxLength"
    >,
    TimeFieldConstraints {}

/** @since 6.3.0 */
export interface ProvidedTimeFieldProps
  extends
    Omit<ProvidedTextFieldProps, "value">,
    Omit<TimeFieldConstraints, "step"> {
  type: "time";
  step?: number | "any";
  defaultValue: Required<InputHTMLAttributes<HTMLInputElement>>["defaultValue"];
}

/** @since 6.3.0 */
export interface ProvidedTimeFieldMessageProps extends ProvidedTimeFieldProps {
  /**
   * These props will be defined as long as the `disableMessage` prop is not
   * `true` from the `useTextField` hook.
   */
  messageProps: ProvidedFormMessageProps;
}

/** @since 6.3.0 */
export interface TimeFieldImplementation extends Omit<
  TextFieldImplementation,
  "fieldProps"
> {
  fieldProps: ProvidedTimeFieldProps;
}

/** @since 6.3.0 */
export interface TimeFieldWithMessageImplementation extends Omit<
  TextFieldWithMessageImplementation,
  "fieldProps"
> {
  fieldProps: ProvidedTimeFieldMessageProps;
}

/** @since 6.3.0 */
export interface ValidatedTimeFieldImplementation extends TimeFieldImplementation {
  fieldProps: ProvidedTimeFieldProps | ProvidedTimeFieldMessageProps;
}

/**
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-time-field | NativeTimeField Demos}
 * @see {@link https://react-md.dev/hooks/use-time-field | useTimeField Demos}
 */
export function useTimeField(
  options: TimeFieldOptions & { disableMessage: true }
): TimeFieldImplementation;

/**
 * The `useTimeField` is a small wrapper around the {@link useTextField} to be used
 * with `<input type="time" />`. It is used in the `NativeTimeField` if an example
 * implementation would like to be seen.
 *
 * @example Simple Example
 * ```tsx
 * import { useTimeField } from "@react-md/core/datetime/useTimeField";
 * import { TextField } from "@react-md/core/form/TextField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, fieldProps, error, errorMessage } = useTimeField({
 *     name: "appt",
 *     required: true,
 *     min: "08:00",
 *     max: "17:00",
 *     step: { minute: 15 },
 *     disableMessage: true,
 *   });
 *
 *   // value: `""` or `"HH:mm"`
 *
 *   return <TextField label="Appointment" {...fieldProps} />
 * }
 * ```
 *
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-time-field | NativeTimeField Demos}
 * @see {@link https://react-md.dev/hooks/use-time-field | useTimeField Demos}
 */
export function useTimeField(
  options: TimeFieldOptions
): TimeFieldWithMessageImplementation;

/**
 * The `useTimeField` is a small wrapper around the {@link useTextField} to be used
 * with `<input type="time" />`. It is used in the `NativeTimeField` if an example
 * implementation would like to be seen.
 *
 * @example Simple Example
 * ```tsx
 * import { useTimeField } from "@react-md/core/datetime/useTimeField";
 * import { TextField } from "@react-md/core/form/TextField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, fieldProps } = useTimeField({
 *     name: "appt",
 *     required: true,
 *     min: "08:00",
 *     max: "17:00",
 *     step: { minute: 15 },
 *   });
 *
 *   // value: `""` or `"HH:mm"`
 *
 *   return <TextField label="Appointment" {...fieldProps} />
 * }
 * ```
 *
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-time-field | NativeTimeField Demos}
 * @see {@link https://react-md.dev/hooks/use-time-field | useTimeField Demos}
 */
export function useTimeField(
  options: TimeFieldOptions
): ValidatedTimeFieldImplementation {
  const { min, max, step, ...fieldOptions } = options;
  if (
    process.env.NODE_ENV !== "production" &&
    step !== undefined &&
    (!min || !max)
  ) {
    throw new Error(
      "A `step` was provided to a time field without the `min` or `max` props."
    );
  }

  const { errorMessage, fieldProps, ...impl } = useTextField(fieldOptions);

  // NOTE: Unlike the other text field components, the `value` should **not**
  // be provided since the time input behaves a bit weirdly with the `onChange`
  // event and it is better to rely on default browser behavior instead of
  // controlling the value. The flow is:
  // - user types `12:30`
  //   - `onChange` is fired with `12:30`
  // - user selects `30` and hits backspace
  //   - `onChange` is fired with `""`
  // If the `value` is set, the other time values would be lost
  const { value, ...allowedFieldProps } = fieldProps;
  const initial = useRef(value);

  return {
    ...impl,
    errorMessage,
    fieldProps: {
      ...allowedFieldProps,
      defaultValue: initial.current,
      min,
      max,
      step: getTimeStep(step),
      type: "time",
    },
  };
}
