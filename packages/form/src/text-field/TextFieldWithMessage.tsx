import React, { forwardRef, ReactElement } from "react";

import {
  FieldMessageContainerExtension,
  FormMessageContainer,
} from "../FormMessageContainer";
import { TextField, TextFieldProps } from "./TextField";

/**
 * @remarks \@since 2.5.0
 */
export type TextFieldWithMessageProps =
  FieldMessageContainerExtension<TextFieldProps>;

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
 *
 * @remarks \@since 2.5.0
 */
export const TextFieldWithMessage = forwardRef<
  HTMLInputElement,
  TextFieldWithMessageProps
>(function TextFieldWithMessage(
  { messageProps, messageContainerProps, ...props },
  ref
): ReactElement {
  return (
    <FormMessageContainer
      {...messageContainerProps}
      messageProps={messageProps}
    >
      <TextField {...props} ref={ref} />
    </FormMessageContainer>
  );
});
