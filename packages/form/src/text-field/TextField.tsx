import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import { cnb } from "cnbuilder";
import { bem } from "@react-md/utils";

import FloatingLabel from "../label/FloatingLabel";
import useFocusState from "../useFocusState";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import useValuedState from "./useValuedState";

/**
 * These are all the "supported" input types for react-md so that they at least
 * render reasonably well by default. There is no built-in validation or
 * anything adding onto existing browser functionality for these types.
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
  | "url";

type TextFieldAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export interface TextFieldProps
  extends TextFieldAttributes,
    TextFieldContainerOptions {
  /**
   * The id for the text field. This is required for accessibility.
   */
  id: string;

  /**
   * The value to use for the text field. This will make the component
   * controlled and require the `onChange` prop to be provided as well otherwise
   * this will act as a read only text field.
   */
  value?: string;

  /**
   * The default value for the text field which will make it uncontrolled. If
   * you manually change the `defaultValue` prop, the input's value **will not
   * change** unless you provide a different `key` as well. Use the `value` prop
   * instead for a controlled input.
   */
  defaultValue?: string;

  /**
   * An optional floating label to use for the text field. This should really
   * only be used when the `theme` prop is not set to `"none"`. This will be
   * wrapped in the `<Label>` component itself and automatically apply the
   * `htmlFor` prop for this text field.
   */
  label?: ReactNode;

  /**
   * An optional style to apply to the label wrapper.
   */
  labelStyle?: CSSProperties;

  /**
   * An optional className to apply to the label wrapper.
   */
  labelClassName?: string;

  /**
   * The type for the text field. `react-md`'s `TextField` supports rendering
   * most of the input types, but will have no built-in validation or additional
   * functionality included.
   */
  type?: SupportedInputTypes;

  /**
   * An optional style to apply to the input itself. The `style` prop will be
   * applied to the container `<div>` instead.
   */
  inputStyle?: CSSProperties;

  /**
   * An optional className to apply to the input itself. The `className` prop
   * will be applied to the container `<div>` instead.
   */
  inputClassName?: string;

  /**
   * An optional ref to apply to the text field's container div element. The
   * default ref is forwarded on to the `input` element.
   */
  containerRef?: Ref<HTMLDivElement>;

  /**
   * Any additional html attributes that should be applied to the main container
   * div. This is probably only going to be used internally so that additional
   * accessibility can be added to text fields for more complex widgets.
   */
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, "style" | "className">;
}

const block = bem("rmd-text-field");

const SPECIAL_TYPES = ["date", "time", "datetime-local", "month", "week"];

/**
 * The text field is a wrapper of the `<input type="text" />` component with
 * some nice default themes. It can also be used to render other text input
 * types with _some_ support.
 */
function TextField(
  {
    style,
    className,
    inputStyle,
    inputClassName,
    label,
    labelStyle,
    labelClassName,
    type = "text",
    theme = "outline",
    dense = false,
    inline = false,
    error = false,
    disabled = false,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    containerRef,
    isLeftAddon = true,
    isRightAddon = true,
    leftChildren,
    rightChildren,
    underlineDirection = "left",
    containerProps,
    ...props
  }: TextFieldProps,
  ref?: Ref<HTMLInputElement>
): ReactElement {
  const { id, value, defaultValue } = props;

  const [focused, onFocus, onBlur] = useFocusState({
    onBlur: propOnBlur,
    onFocus: propOnFocus,
  });

  const [valued, onChange] = useValuedState({
    value,
    defaultValue,
    onChange: propOnChange,
  });

  return (
    <TextFieldContainer
      {...containerProps}
      style={style}
      className={className}
      ref={containerRef}
      theme={theme}
      error={error}
      active={focused}
      label={!!label}
      dense={dense}
      inline={inline}
      disabled={disabled}
      isLeftAddon={isLeftAddon}
      isRightAddon={isRightAddon}
      leftChildren={leftChildren}
      rightChildren={rightChildren}
      underlineDirection={underlineDirection}
    >
      <FloatingLabel
        style={labelStyle}
        className={labelClassName}
        htmlFor={id}
        error={error}
        active={focused}
        floating={focused || valued || SPECIAL_TYPES.includes(type)}
        valued={valued}
        dense={dense}
        disabled={disabled}
      >
        {label}
      </FloatingLabel>
      <input
        {...props}
        ref={ref}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={inputStyle}
        className={cnb(
          block({
            floating: label && theme !== "none",
          }),
          inputClassName
        )}
      />
    </TextFieldContainer>
  );
}

const ForwardedTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  TextField
);

if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    ForwardedTextField.propTypes = {
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "text",
        "password",
        "number",
        "tel",
        "email",
        "date",
        "time",
        "datetime-local",
        "month",
        "week",
        "url",
      ]),
      style: PropTypes.object,
      className: PropTypes.string,
      inputStyle: PropTypes.object,
      inputClassName: PropTypes.string,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      label: PropTypes.node,
      value: PropTypes.string,
      defaultValue: PropTypes.string,
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      dense: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      placeholder: PropTypes.string,
      underlineDirection: PropTypes.oneOf(["left", "right"]),
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isLeftAddon: PropTypes.bool,
      isRightAddon: PropTypes.bool,
    };
  } catch (e) {}
}

export default ForwardedTextField;
