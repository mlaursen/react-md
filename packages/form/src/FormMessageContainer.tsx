import type { PropsWithRef } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { FormMessageProps } from "./FormMessage";
import { FormMessage } from "./FormMessage";

export interface FormMessageContainerExtension {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<FormMessageProps, HTMLDivElement>;

  /**
   * Any props (and an optional ref) to provide to the `<div>` surrounding the
   * children and `FormMessage` component.
   *
   * Note: This will not be used if the `messageProps` are not provided since
   * only the `children` will be returned without the container.
   */
  messageContainerProps?: PropsWithRef<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

export interface FormMessageContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<FormMessageProps, HTMLDivElement>;
}

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
