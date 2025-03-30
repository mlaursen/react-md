import { type HTMLAttributes, forwardRef } from "react";

import { type PropsWithRef } from "../types.js";
import { FormMessage } from "./FormMessage.js";
import { formMessageContainer } from "./formMessageContainerStyles.js";
import { type FormMessageProps } from "./types.js";

/**
 * @since 2.5.0
 */
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
 * Conditionally wraps the `children` in a `.rmd-form-message-container` wrapper
 * and renders the {@link FormMessage} component.
 *
 * @see {@link https://next.react-md.dev/components/form-message | FormMessage Demos}
 * @since 2.5.0
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
      className={formMessageContainer({ className })}
    >
      {children}
      <FormMessage {...messageProps} />
    </div>
  );
});
