"use client";
import type { CSSProperties } from "react";
import { forwardRef } from "react";
import { useEnsuredId } from "../useEnsuredId.js";
import { FormMessageCounter } from "./FormMessageCounter.js";
import { formMessage, formMessageText } from "./formMessageStyles.js";
import { useFormTheme } from "./FormThemeProvider.js";
import type { FormMessageProps } from "./types.js";

/**
 * Props that are used to automatically add a counter for the remaining letters
 * available for the text field. The counter will always be created to the right
 * of the optional message.
 *
 * The counter is really a simple string of: `${length} / ${maxLength}`.
 *
 * If you need additional customization, it is recommended to create your own
 * implementation such as:
 *
 * ```tsx
 * <FormMessage>
 *   {errorMessage}
 *   <MyCounter {...props} />
 * </FormMessage>
 * ```
 *
 * Note: this should not be used alongside form-level messages.
 *
 * @remarks \@since 2.9.0 Renamed from `FormMessageCounterProps` to
 * `FormMessageInputLengthCounterProps` since a `FormMessageCounter` component
 * was added
 */
export interface FormMessageInputLengthCounterProps {
  /**
   * The current length of the value in the related text field.
   */
  length: number;

  /**
   * The max length allowed for the value in the related text field.
   */
  maxLength: number;

  /**
   * An optional style to apply to the counter wrapper element.
   */
  counterStyle?: CSSProperties;

  /**
   * An optional className to apply to the counter wrapper element.
   */
  counterClassName?: string;
}

export interface FormMessageWithCounterProps
  extends FormMessageProps,
    FormMessageInputLengthCounterProps {}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the useFormTheme hook
 *
 * The `FormMessage` component is used to create additional helper messages or
 * error messages and generally placed below the related `TextField`. If a
 * `length` (of the `value`) and `maxLength` are provided, a counter will also
 * be displayed to the right of the `children`.
 *
 * This component can also be used to create form-level validation messages by
 * setting the `role` prop to `"alert"`.
 */
export const FormMessage = forwardRef<
  HTMLDivElement,
  FormMessageProps & Partial<FormMessageInputLengthCounterProps>
>(function FormMessage(props, ref) {
  const {
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
    ...remaining
  } = props;
  const id = useEnsuredId(propId, "form-message");
  const { theme } = useFormTheme({ theme: propTheme });

  let message = children;
  if (!disableWrap && children) {
    message = (
      <p
        id={`${id}-message`}
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
          style={counterStyle}
          className={counterClassName}
        >
          {`${length} / ${maxLength}`}
        </FormMessageCounter>
      )}
    </div>
  );
});
