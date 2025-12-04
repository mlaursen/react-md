"use client";

import { forwardRef } from "react";

import { TextField, type TextFieldProps } from "../form/TextField.js";
import { type TimeFieldOptions, useTimeField } from "./useTimeField.js";

/**
 * @since 6.3.0
 */
export interface NativeTimeFieldProps
  extends
    Omit<TextFieldProps, keyof TimeFieldOptions | "value">,
    Omit<TimeFieldOptions, "ref"> {}

/**
 * The `NativeTimeField` is a simple wrapper around the `TextField` using the
 * `useTimeField` hook.
 *
 * @example Simple Example
 * ```tsx
 * import { NativeTimeField } from "@react-md/core/datetime/NativeTimeField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <NativeTimeField label="Time" name="appt" />;
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/native-time-field | NativeTimeField Demos}
 * @see {@link https://react-md.dev/components/text-field | TextField Demos}
 * @since 6.3.0
 */
export const NativeTimeField = forwardRef<
  HTMLInputElement,
  NativeTimeFieldProps
>(function NativeTimeField(props, ref) {
  const {
    id,
    min,
    max,
    step,
    onBlur,
    onInvalid,
    onChange,
    helpText,
    required,
    validationType,
    disableMessage,
    errorIcon,
    isErrored,
    getErrorIcon,
    getErrorMessage,
    onErrorChange,
    disableReset,
    defaultValue,
    ...remaining
  } = props;
  const { name, form } = props;
  const { fieldProps } = useTimeField({
    id,
    ref,
    name,
    form,
    min,
    max,
    step,
    onBlur,
    onChange,
    onInvalid,
    helpText,
    required,
    validationType,
    disableMessage: disableMessage ?? (!min && !max && !step && !required),
    errorIcon,
    isErrored,
    getErrorIcon,
    getErrorMessage,
    onErrorChange,
    disableReset,
    defaultValue,
  });

  let { messageProps } = remaining;
  if (fieldProps.messageProps) {
    messageProps = {
      ...fieldProps.messageProps,
      ...remaining.messageProps,
    };
  }

  return (
    <TextField {...remaining} {...fieldProps} messageProps={messageProps} />
  );
});
