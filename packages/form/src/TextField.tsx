import type { PropsWithRef } from "@react-md/core";
import { bem, useEnsuredId } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { FormMessageContainerExtension } from "./FormMessageContainer";
import { FormMessageContainer } from "./FormMessageContainer";
import { useFormTheme } from "./FormThemeProvider";
import type { LabelProps } from "./Label";
import { Label } from "./Label";
import type { TextFieldContainerOptions } from "./TextFieldContainer";
import { TextFieldContainer } from "./TextFieldContainer";

const styles = bem("rmd-text-field");

export interface TextFieldClassNameOptions {
  className?: string;
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
 * @remarks \@since 2.5.0 - `"search"` was added
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
  | "month"
  | "week"
  | "url"
  | "color"
  | "search";

const SPECIAL_TYPES: readonly SupportedInputTypes[] = [
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "color",
];

export type TextFieldAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export interface TextFieldProps
  extends TextFieldAttributes,
    TextFieldContainerOptions,
    FormMessageContainerExtension {
  label?: ReactNode;
  labelProps?: PropsWithRef<LabelProps, HTMLLabelElement>;
  labelStyle?: CSSProperties;
  labelClassName?: string;

  inputStyle?: CSSProperties;
  inputClassName?: string;

  type?: SupportedInputTypes;
}

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
      dense = false,
      error = false,
      active: propActive,
      inline = false,
      stretch = false,
      leftAddon,
      rightAddon,
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
    const active = propActive ?? false;

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
        >
          <input
            {...remaining}
            id={id}
            ref={ref}
            type={type}
            disabled={disabled}
            style={inputStyle}
            className={textField({
              placeholderHidden: !!label && theme !== "none" && !active,
              className: inputClassName,
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
              active={active || SPECIAL_TYPES.includes(type)}
              disabled={disabled}
              readOnly={readOnly}
            >
              {label}
            </Label>
          )}
        </TextFieldContainer>
      </FormMessageContainer>
    );
  }
);
