import React, { CSSProperties, forwardRef, HTMLAttributes } from "react";
import cn from "classnames";
import { bem } from "@react-md/utils";

import { FormTheme, useFormTheme } from "./FormThemeProvider";
import { FormMessageCounter } from "./FormMessageCounter";

const block = bem("rmd-form-message");

export interface FormMessageProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "minLength" | "maxLength"> {
  /**
   * The id for the message container element. This is required for
   * accessibility.
   */
  id: string;

  /**
   * If this component is acting as a form-level error message handler, the role
   * should be updated to be `"alert"` for additional accessibility.
   *
   * Note: when creating a form-level error message handler, the messages should
   * no longer appear as the user types and instead once the user tries to
   * submit the form. Having an alert role disrupts normal screen reader
   * behavior by immediately reading changes in this element.
   */
  role?: "alert";

  /**
   * Boolean if the message should gain the error state which changes the text
   * color to `red` by default.
   */
  error?: boolean;

  /**
   * Boolean if the children should no longer be wrapped in a `<p>` tag. This
   * should normally only be disabled if using a custom error message wrapper or
   * the counter behavior is not being used. To get correct alignments of the
   * message and counter, the `children` must be wrapped in some element and
   * cannot be plain test.
   *
   * Note: this will always be considered `true` if the `role` is set to
   * `"alert"`.
   */
  disableWrap?: boolean;

  /**
   * The current theme for the related text field. This is really only used to
   * match the current horizontal padding of the text field.
   */
  theme?: FormTheme;

  /**
   * An optional style to apply to the `<p>` tag that surrounds the `children`.
   * This will not be used if `role="alert"` or `disableWrap={true}`.
   */
  messageStyle?: CSSProperties;

  /**
   * An optional className to apply to the `<p>` tag that surrounds the
   * `children`. This will not be used if `role="alert"` or
   * `disableWrap={true}`.
   */
  messageClassName?: string;
}

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
>(function FormMessage(
  {
    id,
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
    ...props
  },
  ref
) {
  const { theme } = useFormTheme({ theme: propTheme });
  let message = children;
  if (!disableWrap && children) {
    message = (
      <p
        id={`${id}-message`}
        style={messageStyle}
        className={cn(block("message"), messageClassName)}
      >
        {children}
      </p>
    );
  }

  return (
    <div
      {...props}
      id={id}
      ref={ref}
      aria-live={role !== "alert" ? "polite" : undefined}
      role={role}
      className={cn(
        block({
          error,
          [theme]: theme !== "none",
        }),
        className
      )}
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

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    FormMessage.propTypes = {
      id: PropTypes.string.isRequired,
      role: PropTypes.oneOf(["alert"]),
      className: PropTypes.string,
      messageStyle: PropTypes.object,
      messageClassName: PropTypes.string,
      counterStyle: PropTypes.object,
      counterClassName: PropTypes.string,
      error: PropTypes.bool,
      length: PropTypes.number,
      maxLength: PropTypes.number,
      disableWrap: PropTypes.bool,
      children: PropTypes.node,
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _counterValidator: (props, _propName, component) => {
        const { length, maxLength } = props;
        const lengthType = typeof length;
        const maxLengthType = typeof maxLength;
        if (lengthType === maxLengthType) {
          return null;
        }

        return new Error(
          `Both the \`length\` and \`maxLength\` props are required to be defined ` +
            `and a number to create a counter in the \`${component}\` component, but ` +
            `received \`length: ${length}\` and \`maxLength: ${maxLength}\``
        );
      },
    };
  } catch (e) {}
}
