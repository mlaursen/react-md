import type { PropsWithRef } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { FormMessage } from "./FormMessage";
import type { FormMessageProps } from "./types";

export interface FormMessageContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<FormMessageProps, HTMLDivElement>;
}

/**
 * @internal
 */
export const FormMessageContainer = forwardRef<
  HTMLDivElement,
  FormMessageContainerProps
>(function FormMessageContainer(props, ref) {
  const { className, children, messageProps, ...remaining } = props;
  if (!messageProps) {
    return <>{children}</>;
  }

  return (
    <div
      {...remaining}
      ref={ref}
      className={cnb("rmd-form-message-container", className)}
    >
      {children}
      <FormMessage {...messageProps} />
    </div>
  );
});
