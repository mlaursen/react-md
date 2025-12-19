import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { type PropsWithRef } from "../types.js";
import { FormMessage } from "./FormMessage.js";
import {
  type FormMessageContainerClassNameOptions,
  formMessageContainer,
} from "./formMessageContainerStyles.js";
import { type ConfigurableFormMessageProps } from "./types.js";

/**
 * @since 2.5.0
 */
export interface FormMessageContainerProps
  extends HTMLAttributes<HTMLDivElement>, FormMessageContainerClassNameOptions {
  ref?: Ref<HTMLDivElement>;

  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<ConfigurableFormMessageProps>;
}

/**
 * Conditionally wraps the `children` in a `.rmd-form-message-container` wrapper
 * and renders the {@link FormMessage} component.
 *
 * @see {@link https://react-md.dev/components/form-message | FormMessage Demos}
 * @since 2.5.0
 */
export function FormMessageContainer(
  props: FormMessageContainerProps
): ReactElement {
  const { ref, className, children, inline, messageProps, ...remaining } =
    props;

  if (!messageProps) {
    return <>{children}</>;
  }

  return (
    <div
      {...remaining}
      ref={ref}
      className={formMessageContainer({ className, inline })}
    >
      {children}
      <FormMessage {...messageProps} />
    </div>
  );
}
