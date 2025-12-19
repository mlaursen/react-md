"use client";

import { type ReactElement, type Ref } from "react";

import { TextField, type TextFieldProps } from "../form/TextField.js";
import { type DateFieldOptions, useDateField } from "./useDateField.js";

/** @since 6.3.0 */
export interface NativeDateFieldProps
  extends
    Omit<TextFieldProps, keyof DateFieldOptions | "value">,
    Omit<DateFieldOptions, "ref"> {
  ref?: Ref<HTMLInputElement>;
}

/**
 * The `NativeDateField` is a simple wrapper around the `TextField` using the
 * `useDateField` hook.
 *
 * @example Simple Example
 * ```tsx
 * import { NativeDateField } from "@react-md/core/datetime/NativeDateField";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <NativeDateField label="Delivery Date" name="delivery" />;
 * }
 * ```
 *
 * @see {@link https://react-md.dev/components/native-time-field | NativeDateField Demos}
 * @see {@link https://react-md.dev/components/text-field | TextField Demos}
 * @since 6.3.0
 */
export function NativeDateField(props: NativeDateFieldProps): ReactElement {
  const {
    ref,
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
  const { fieldProps } = useDateField({
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
}
