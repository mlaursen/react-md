import { bem, useEnsuredId } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import { Label } from "./Label";
import { TextFieldContainer } from "./TextFieldContainer";
import type { AutoCompleteValue, FormFieldOptions } from "./types";

const styles = bem("rmd-text-field");

export interface TextFieldClassNameOptions {
  className?: string;

  /**
   * Set this value to `true` when a text field has a floating label the text
   * field is not focused or valued so that the placeholder is hidden by setting
   * the opacity to 0. This makes it so the placeholder and label to not cover
   * each other.
   *
   * @defaultValue `false`
   */
  placeholderHidden?: boolean;
}

export function textField(options: TextFieldClassNameOptions = {}): string {
  const { className, placeholderHidden = false } = options;

  return cnb(
    styles({
      "placeholder-hidden": placeholderHidden,
    }),
    className
  );
}

/**
 * These are all the "supported" input types for react-md so that they at least
 * render reasonably well by default. There is no built-in validation or
 * anything adding onto existing browser functionality for these types.
 *
 * @remarks
 * \@since 2.5.0 - `"search"` was added
 * \@since 6.0.0 Dropped support for `"week"` and `"month"` input types since
 * they are not available in Firefox and Safari at this time.
 */
export type SupportedInputTypes =
  | "text"
  | "password"
  | "number"
  | "tel"
  | "email"
  | "date"
  | "time"
  | "datetime-local"
  | "url"
  | "color"
  | "search";

export type TextFieldAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export interface TextFieldProps extends TextFieldAttributes, FormFieldOptions {
  /**
   * Optional placeholder text to display in the text field.
   *
   * @defaultValue `label ? " " : ""`
   */
  placeholder?: string;

  /**
   * Any optional inline styles to set on the input.
   */
  inputStyle?: CSSProperties;

  /**
   * An optional `className` to add to the input.
   */
  inputClassName?: string;

  /**
   * The text field type.
   *
   * @defaultValue `"text"`
   */
  type?: SupportedInputTypes;

  /**
   * Set this to enable additional autocompletion suggestions for a user for
   * different form fields. Using this prop will update the {@link name} and
   * {@link autoComplete} to default to this value.
   *
   * @example
   * ```tsx
   * <Form>
   *   <TextField
   *     label="Enter your credit card number"
   *     autoCompleteValue="cc-number"
   *     {...creditCardProps}
   *     inputMode="number"
   *   />
   *   <TextField
   *     label="Name on card"
   *     autoCompleteValue="cc-name"
   *     {...creditCardNameProps}
   *   />
   *   <TextField
   *     label="Security code"
   *     autoCompleteValue="cc-csc"
   *     {...securityCodeProps}
   *     inputMode="number"
   *   />
   *   <Button type="submit">Submit</Button>
   * </Form>
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
   * @see {@link AutoCompleteValue}
   * @remarks \@since 6.0.0
   */
  autoCompleteValue?: AutoCompleteValue;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { TextField } from "@react-md/form";
 * import type { ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return (
 *     <TextField
 *       label="Name"
 *       placeholder="Bob"
 *       defaultValue=""
 *     />
 *   );
 * }
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(props, ref) {
    const {
      id: propId,
      style,
      className,
      type = "text",
      label,
      labelProps,
      labelStyle,
      labelClassName,
      autoCompleteValue,
      autoComplete = autoCompleteValue,
      name = autoCompleteValue,
      dense = false,
      error = false,
      active = false,
      inline = false,
      stretch = false,
      leftAddon,
      rightAddon,
      disableLeftAddonStyles = false,
      disableRightAddonStyles = false,
      inputStyle,
      inputClassName,
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
      messageProps,
      messageContainerProps,
      ...remaining
    } = props;
    const { disabled = false, readOnly = false } = props;
    const id = useEnsuredId(propId, "text-field");
    const { theme, underlineDirection } = useFormTheme({
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
    });

    let { placeholder = "" } = props;
    if (label && !placeholder) {
      // See the placeholer type defintiion comments for information
      placeholder = " ";
    }

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          style={style}
          className={className}
          theme={theme}
          label={!!label}
          error={error}
          dense={dense}
          inline={inline}
          active={active}
          stretch={stretch}
          readOnly={readOnly}
          disabled={disabled}
          leftAddon={leftAddon}
          rightAddon={rightAddon}
          underlineDirection={underlineDirection}
          disableLeftAddonStyles={disableLeftAddonStyles}
          disableRightAddonStyles={disableRightAddonStyles}
        >
          <input
            {...remaining}
            id={id}
            ref={ref}
            type={type}
            name={name}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            style={inputStyle}
            className={textField({
              className: inputClassName,
              placeholderHidden: !!label && !active,
            })}
          />
          {label && (
            <Label
              {...labelProps}
              htmlFor={id}
              style={labelProps?.style ?? labelStyle}
              className={labelProps?.className ?? labelClassName}
              floating
              dense={dense}
              error={error}
              active={active}
              disabled={disabled}
            >
              {label}
            </Label>
          )}
        </TextFieldContainer>
      </FormMessageContainer>
    );
  }
);
