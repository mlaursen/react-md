import { type ReactElement } from "react";

import { useEnsuredId } from "../useEnsuredId.js";
import { FormMessageCounter } from "./FormMessageCounter.js";
import { getFormConfig } from "./formConfig.js";
import { formMessage, formMessageText } from "./formMessageStyles.js";
import {
  type ConfigurableFormMessageProps,
  type FormMessageInputLengthCounterProps,
} from "./types.js";

/**
 * @since 7.0.0 This was defined inline
 */
export interface FormMessageProps
  extends
    ConfigurableFormMessageProps,
    Partial<FormMessageInputLengthCounterProps> {}

/**
 * The `FormMessage` component is used to create additional helper messages or
 * error messages and generally placed below the related `TextField`. If a
 * `length` (of the `value`) and `maxLength` are provided, a counter will also
 * be displayed to the right of the `children`.
 *
 * This component can also be used to create form-level validation messages by
 * setting the `role` prop to `"alert"`.
 *
 * @see {@link https://react-md.dev/components/form-message | FormMessage Demos}
 */
export function FormMessage(props: FormMessageProps): ReactElement {
  const {
    ref,
    id: propId,
    role,
    className,
    counterStyle,
    counterClassName,
    messageStyle,
    messageClassName,
    error = false,
    disableWrap = false,
    theme: propTheme,
    children,
    length,
    maxLength,
    counterProps,
    messageProps,
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "form-message");
  const theme = getFormConfig("theme", propTheme);

  let message = children;
  if (!disableWrap && children) {
    message = (
      <p
        id={`${id}-message`}
        {...messageProps}
        style={messageStyle}
        className={formMessageText({ className: messageClassName })}
      >
        {children}
      </p>
    );
  }

  return (
    <div
      {...remaining}
      id={id}
      ref={ref}
      aria-live={role !== "alert" ? "polite" : undefined}
      role={role}
      className={formMessage({ error, theme, className })}
    >
      {message}
      {typeof length === "number" && typeof maxLength === "number" && (
        <FormMessageCounter
          id={`${id}-counter`}
          {...counterProps}
          style={counterStyle}
          className={counterClassName}
        >
          {`${length} / ${maxLength}`}
        </FormMessageCounter>
      )}
    </div>
  );
}
