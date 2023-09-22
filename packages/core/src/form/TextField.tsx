"use client";
import { cnb } from "cnbuilder";
import {
  forwardRef,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import { FormMessageContainer } from "./FormMessageContainer.js";
import { useFormTheme } from "./FormThemeProvider.js";
import { Label } from "./Label.js";
import { TextFieldContainer } from "./TextFieldContainer.js";
import {
  type FormFieldOptions,
  type UserAgentAutoCompleteProps,
} from "./types.js";

const styles = bem("rmd-text-field");

/** @remarks \@since 6.0.0 */
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

/**
 * @remarks \@since 6.0.0
 */
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

/**
 * @remarks \@since 6.0.0 Renamed from `TextFieldAttributes` to
 * `TextFieldInputAttributes`
 */
export type TextFieldInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

/**
 * @remarks \@since 6.0.0 Removed the `containerRef` prop.
 */
export interface TextFieldProps
  extends TextFieldInputAttributes,
    UserAgentAutoCompleteProps,
    FormFieldOptions {
  /**
   * @defaultValue `"text-field-" + useId()`
   */
  id?: string;

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
   * Optional props to provide to the {@link TextFieldContainer} component.
   * There probably isn't any real use for this prop other than if you need to
   * add a `ref` for some DOM behavior.
   */
  containerProps?: PropsWithRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

  /**
   * The `children` will be rendered within the `TextFieldContainer` and before
   * the `<input />` element. This was added to support the new `Select`
   * component implementation
   *
   * @internal
   * @remarks \@since 6.0.0
   */
  children?: ReactNode;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the useFormTheme hook
 *
 * The structure for this component is:
 * @example
 * Component Structure
 * ```tsx
 * <FormMessageContainer {...messageContainerProps}>
 *   <TextFieldContainer {...containerProps}>
 *     <input {...props} />
 *     <Label {...labelProps} />
 *   </TextFieldContainer>
 * </FormMessageContainer>
 * ```
 *
 * @example
 * Simple Example
 * ```tsx
 * import { TextField } from "@react-md/core";
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
      containerProps,
      children,
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
      // See the placeholder type definition comments for information
      placeholder = " ";
    }

    return (
      <FormMessageContainer
        {...messageContainerProps}
        messageProps={messageProps}
      >
        <TextFieldContainer
          {...containerProps}
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
          {children}
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
