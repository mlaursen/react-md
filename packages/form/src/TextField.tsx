import React, {
  FC,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useState,
  useMemo,
  CSSProperties,
  forwardRef,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import {
  WithForwardedRef,
  useRefCache,
  useToggle,
  Omit,
} from "@react-md/utils";

import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import FloatingLabel from "./FloatingLabel";
import useFocusState from "./useFocusState";
import useValuedState from "./useValuedState";

/**
 * These are all the "supported" input types for react-md so that they at least
 * render reasonably well by default. There is no built-in validation or anything
 * adding onto existing browser functionality for these types.
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
  | "range"
  | "color";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
    TextFieldContainerOptions {
  /**
   * The id for the text field. This is required for accessibility.
   */
  id: string;

  /**
   * The default value for the text field which will make it uncontrolled.
   * If you manually change the `defaultValue` prop, the input's value **will
   * not change** unless you provide a different `key` as well. Use the `value`
   * prop instead for a controlled input.
   */
  defaultValue?: string;

  /**
   * An optional floating label to use for the text field. This should really only be
   * used when the `theme` prop is not set to `"none"`. This will be wrapped in
   * the `<Label>` component itself and automatically apply the `htmlFor` prop for this
   * text field.
   */
  label?: ReactNode;

  /**
   * The type for the text field. `react-md`'s `TextField` supports rendering
   * most of the input types, but will have no built-in validation or additional
   * functionality included.
   */
  type?: SupportedInputTypes;

  /**
   * An optional style to apply to the input itself. The `style` prop will be applied to the
   * container `<div>` instead.
   */
  inputStyle?: CSSProperties;

  /**
   * An optional className to apply to the input itself. The `className` prop will be applied to the
   * container `<div>` instead.
   */
  inputClassName?: string;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    TextFieldProps,
    | "type"
    | "theme"
    | "inline"
    | "defaultValue"
    | "underlineDirection"
    | "error"
  >
>;
type WithDefaultProps = TextFieldProps & DefaultProps & WithRef;

const block = bem("rmd-text-field");
const SPECIAL_TYPES = [
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "range",
  "color",
];

const TextField: FC<TextFieldProps & WithRef> = providedProps => {
  const {
    style,
    className,
    inputStyle,
    inputClassName,
    forwardedRef,
    theme,
    error,
    inline,
    label,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    underlineDirection,
    leftChildren,
    rightChildren,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, defaultValue, disabled, type } = props;

  const filled = theme === "filled";
  const outline = theme === "outline";
  const underline = theme === "underline";
  const unstyled = theme === "none";
  const isSpecialType = SPECIAL_TYPES.includes(type);
  const { focused, onBlur, onFocus } = useFocusState({
    onBlur: propOnBlur,
    onFocus: propOnFocus,
  });
  const { valued, onChange } = useValuedState({
    defaultValue,
    onChange: propOnChange,
  });

  return (
    <TextFieldContainer
      style={style}
      className={className}
      inline={inline}
      theme={theme}
      error={error}
      active={focused}
      underlineDirection={underlineDirection}
      leftChildren={leftChildren}
      rightChildren={rightChildren}
    >
      <FloatingLabel
        htmlFor={id}
        error={error}
        active={focused}
        valued={valued || isSpecialType}
        disabled={disabled}
      >
        {label}
      </FloatingLabel>
      <input
        {...props}
        autoComplete="new-password"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={forwardedRef}
        style={inputStyle}
        className={cn(
          block({
            floating: !unstyled,
            secondary: !disabled && !focused && !valued && isSpecialType,
            "no-v-padding": type === "color",
          }),
          inputClassName
        )}
      />
    </TextFieldContainer>
  );
};

const defaultProps: DefaultProps = {
  type: "text",
  theme: "underline",
  error: false,
  inline: false,
  defaultValue: "",
  underlineDirection: "left",
};

TextField.defaultProps = defaultProps;

export default forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField {...props} forwardedRef={ref} />
));
