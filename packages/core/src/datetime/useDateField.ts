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

/**
 * @since 6.3.0
 */
export interface DateFieldConstraints {
  /**
   * This **must** be in the format `yyyy-mm-dd`
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#min | min attribute}
   */
  min?: string;

  /**
   * This **must** be in the format `yyyy-mm-dd`
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#max | max attribute}
   */
  max?: string;

  /**
   * For date inputs, the value of step is given in days; and is treated as a
   * number of milliseconds equal to 86,400,000 times the step value (the
   * underlying numeric value is in milliseconds). The default value of step is
   * 1, indicating 1 day.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date#step | step attribute}
   */
  step?: number | "any";
}

/** @since 6.3.0 */
export interface DateFieldOptions
  extends Omit<
      TextFieldHookOptions,
      | "isNumber"
      | "counter"
      | "pattern"
      | "maxLength"
      | "minLength"
      | "disableMaxLength"
    >,
    DateFieldConstraints {}

/** @since 6.3.0 */
export interface ProvidedDateFieldProps
  extends Omit<ProvidedTextFieldProps, "value">,
    Omit<DateFieldConstraints, "step"> {
  type: "date";
  step?: number | "any";
  defaultValue: Required<InputHTMLAttributes<HTMLInputElement>>["defaultValue"];
}

/** @since 6.3.0 */
export interface ProvidedDateFieldMessageProps extends ProvidedDateFieldProps {
  /**
   * These props will be defined as long as the `disableMessage` prop is not
   * `true` from the `useTextField` hook.
   */
  messageProps: ProvidedFormMessageProps;
}

/** @since 6.3.0 */
export interface DateFieldImplementation
  extends Omit<TextFieldImplementation, "fieldProps"> {
  fieldProps: ProvidedDateFieldProps;
}

/** @since 6.3.0 */
export interface DateFieldWithMessageImplementation
  extends Omit<TextFieldWithMessageImplementation, "fieldProps"> {
  fieldProps: ProvidedDateFieldMessageProps;
}

/** @since 6.3.0 */
export interface ValidatedDateFieldImplementation
  extends DateFieldImplementation {
  fieldProps: ProvidedDateFieldProps | ProvidedDateFieldMessageProps;
}

/**
 * The `useDateField` is a small wrapper around the {@link useTextField} to be used
 * with `<input type="date" />`. It is used in the `NativeDateField` if an example
 * implementation would like to be seen.
 *
 * @example Simple Example
 * ```tsx
 * import { useDateField } from "@react-md/core/datetime/useDateField";
 * import { TextField } from "@react-md/core/form/TextField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, fieldProps, error, errorMessage } = useDateField({
 *     name: "delivery",
 *     required: true,
 *     min: "2025-01-01",
 *     max: "2026-01-01",
 *     disableMessage: true,
 *   });
 *
 *   // value: `""` or `"yyyy-mm-dd"`
 *
 *   return <TextField label="Delivery Date" {...fieldProps} />
 * }
 * ```
 *
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-date-field | NativeDateField Demos}
 * @see {@link https://react-md.dev/hooks/use-date-field | useDateField Demos}
 */
export function useDateField(
  options: DateFieldOptions & { disableMessage: true }
): DateFieldImplementation;

/**
 * The `useDateField` is a small wrapper around the {@link useTextField} to be used
 * with `<input type="date" />`. It is used in the `NativeDateField` if an example
 * implementation would like to be seen.
 *
 * @example Simple Example
 * ```tsx
 * import { useDateField } from "@react-md/core/datetime/useDateField";
 * import { TextField } from "@react-md/core/form/TextField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const { value, fieldProps } = useDateField({
 *     name: "delivery",
 *     required: true,
 *     min: "2025-01-01",
 *     max: "2026-01-01",
 *   });
 *
 *   // value: `""` or `"yyyy-mm-dd"`
 *
 *   return <TextField label="Delivery Date" {...fieldProps} />
 * }
 * ```
 *
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-date-field | NativeDateField Demos}
 * @see {@link https://react-md.dev/hooks/use-date-field | useDateField Demos}
 */
export function useDateField(
  options: DateFieldOptions
): DateFieldWithMessageImplementation;

/**
 * @since 6.3.0
 * @see {@link https://react-md.dev/components/native-date-field | NativeTimeField Demos}
 * @see {@link https://react-md.dev/hooks/use-date-field | useTimeField Demos}
 */
export function useDateField(
  options: DateFieldOptions
): ValidatedDateFieldImplementation {
  const { min, max, step, ...fieldOptions } = options;
  const { fieldProps, ...impl } = useTextField(fieldOptions);

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
    fieldProps: {
      ...allowedFieldProps,
      defaultValue: initial.current,
      min,
      max,
      step,
      type: "date",
    },
  };
}
