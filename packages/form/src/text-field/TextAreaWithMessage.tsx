import React, { forwardRef, ReactElement } from "react";
import {
  FieldMessageContainerExtension,
  FieldMessageContainer,
} from "./FieldMessageContainer";

import { TextArea, TextAreaProps } from "./TextArea";

export type TextAreaWithMessageProps = FieldMessageContainerExtension<
  TextAreaProps
>;

/**
 * This component is a simple wrapper for the `TextArea` and `FormMessage`
 * components that should be used along with the `useTextField` hook to
 * conditionally show help and error messages with a `TextArea`.
 *
 * Simple example:
 *
 * ```ts
 * const [value, areaProps] = useTextField({
 *   id: "area-id",
 * });
 *
 * return (
 *   <TextFieldWithMessage
 *     label="Label"
 *     placeholder="Placeholder"
 *     {...areaProps}
 *   />
 * );
 * ```
 */
export const TextAreaWithMessage = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithMessageProps
>(function TextAreaWithMessage(
  { messageProps, messageContainerProps, ...props },
  ref
): ReactElement {
  return (
    <FieldMessageContainer
      {...messageContainerProps}
      messageProps={messageProps}
    >
      <TextArea {...props} ref={ref} />
    </FieldMessageContainer>
  );
});
