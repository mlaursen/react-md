import React, { forwardRef, ReactElement } from "react";

import {
  FieldMessageContainer,
  FieldMessageContainerExtension,
} from "./FieldMessageContainer";
import { TextField, TextFieldProps } from "./TextField";

export type TextFieldWithMessageProps = FieldMessageContainerExtension<
  TextFieldProps
>;

/**
 * This component is a simple wrapper for the `TextField` and `FormMessage`
 * components that should be used along with the `useTextField` hook to
 * conditionally show help and error messages with a `TextField`.
 *
 * Simple example:
 *
 * ```ts
 * const [value, fieldProps] = useTextField({
 *   id: "field-id",
 * });
 *
 * return (
 *   <TextFieldWithMessage
 *     label="Label"
 *     placeholder="Placeholder"
 *     {...fieldProps}
 *   />
 * );
 * ```
 */
export const TextFieldWithMessage = forwardRef<
  HTMLInputElement,
  TextFieldWithMessageProps
>(function TextFieldWithMessage(
  { messageProps, messageContainerProps, ...props },
  ref
): ReactElement {
  return (
    <FieldMessageContainer
      {...messageContainerProps}
      messageProps={messageProps}
    >
      <TextField {...props} ref={ref} />
    </FieldMessageContainer>
  );
});
