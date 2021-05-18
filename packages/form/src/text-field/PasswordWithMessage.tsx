import React, { forwardRef, ReactElement } from "react";

import {
  FieldMessageContainerExtension,
  FormMessageContainer,
} from "../FormMessageContainer";
import { Password, PasswordProps } from "./Password";

/**
 * @remarks \@since 2.5.0
 */
export type PasswordWithMessageProps =
  FieldMessageContainerExtension<PasswordProps>;

/**
 * This component is a simple wrapper for the `Password` and `FormMessage`
 * components that should be used along with the `useTextField` hook to
 * conditionally show help and error messages with a `Password`.
 *
 * Simple example:
 *
 * ```ts
 * const [value, fieldProps] = useTextField({
 *   id: "field-id",
 *   required: true,
 *   minLength: 10,
 * });
 *
 * return (
 *   <PasswordWithMessage
 *     label="Label"
 *     placeholder="Placeholder"
 *     {...fieldProps}
 *   />
 * );
 * ```
 *
 * Note: Unline the `TextFieldWithMessage` and `TextAreaWithMessage`, the error
 * icon will do nothing for this component unless the `disableVisibility` prop
 * is enabled.
 *
 * @remarks \@since 2.5.0
 */
export const PasswordWithMessage = forwardRef<
  HTMLInputElement,
  PasswordWithMessageProps
>(function PasswordWithMessage(
  { messageProps, messageContainerProps, ...props },
  ref
): ReactElement {
  return (
    <FormMessageContainer
      {...messageContainerProps}
      messageProps={messageProps}
    >
      <Password {...props} ref={ref} />
    </FormMessageContainer>
  );
});
