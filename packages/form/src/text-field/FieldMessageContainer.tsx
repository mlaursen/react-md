import React, { forwardRef, HTMLAttributes, ReactElement } from "react";
import cn from "classnames";
import { PropsWithRef } from "@react-md/utils";
import { FormMessage, FormMessageProps } from "./FormMessage";

type DivAttributes = HTMLAttributes<HTMLDivElement>;
type MessageProps = PropsWithRef<FormMessageProps, HTMLDivElement>;
type MessageContainerProps = PropsWithRef<DivAttributes, HTMLDivElement>;

/**
 * This is a utility type that allows for a component to "extend" the
 * `FieldMessageContainer` component. This should really be used internally with
 * any `TextField` or `TextArea` related components.
 */
export type FieldMessageContainerExtension<P, V = string> = Omit<
  P,
  "value" | "defaultValue"
> & {
  /**
   * The value will always be required for these extensions since they should be
   * used with the `useTextField` hook.
   */
  value: V;

  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: MessageProps;

  /**
   * Any props (and an optional ref) to provide to the `<div>` surrounding the
   * children and `FormMessage` component.
   *
   * Note: This will not be used if the `messageProps` are not provided since
   * only the `children` will be returned without the container.
   */
  messageContainerProps?: MessageContainerProps;
};

export interface FieldMessageContainerProps extends DivAttributes {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: MessageProps;
}

/**
 * A wrapper component that can be used to display a `TextField` related
 * component or `TextArea` along with the `FormMessage` component.
 */
export const FieldMessageContainer = forwardRef<
  HTMLDivElement,
  FieldMessageContainerProps
>(function FieldMessageContainer(
  { className, children, messageProps, ...props },
  ref
): ReactElement {
  if (!messageProps) {
    return <>{children}</>;
  }

  return (
    <div
      {...props}
      ref={ref}
      className={cn("rmd-field-message-container", className)}
    >
      {children}
      <FormMessage {...messageProps} />
    </div>
  );
});
