import React, {
  CSSProperties,
  FC,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import cn from "classnames";
import { bem, Omit, WithForwardedRef } from "@react-md/utils";

import FloatingLabel from "../label/FloatingLabel";
import useFocusState from "../useFocusState";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
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
   * The value to use for the text field. This will make the component controlled
   * and require the `onChange` prop to be provided as well otherwise this will
   * act as a read only text field.
   */
  value?: string;

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
   * An optional style to apply to the input itself. The `style` prop will be applied to the
   * container `<div>` instead.
   */
  inputStyle?: CSSProperties;

  /**
   * An optional className to apply to the input itself. The `className` prop will be applied to the
   * container `<div>` instead.
   */
  inputClassName?: string;

  /**
   * An optional ref to apply to the text field's container div element. The default ref is
   * forwarded on to the `input` element.
   */
  containerRef?: Ref<HTMLDivElement>;
}

type WithRef = WithForwardedRef<HTMLInputElement>;
type DefaultProps = Required<
  Pick<
    TextFieldProps,
    | "type"
    | "theme"
    | "error"
    | "dense"
    | "inline"
    | "disabled"
    | "underlineDirection"
    | "isLeftAddon"
    | "isRightAddon"
  >
>;
type WithDefaultProps = TextFieldProps & DefaultProps & WithRef;

const block = bem("rmd-text-field");

const SPECIAL_TYPES = ["date", "time", "datetime-local", "month", "week"];

/**
 * The text field is a wrapper of the `<input type="text" />` component
 * with some nice default themes. It can also be used to render other
 * text input types with _some_ support.
 */
const TextField: FC<TextFieldProps & WithRef> = providedProps => {
  const {
    style,
    className,
    inputStyle,
    inputClassName,
    label,
    labelStyle,
    labelClassName,
    theme,
    error,
    dense,
    inline,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    containerRef,
    forwardedRef,
    isLeftAddon,
    isRightAddon,
    leftChildren,
    rightChildren,
    underlineDirection,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, value, defaultValue, disabled, type } = props;

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
        leftChildren={!!leftChildren}
        rightChildren={!!rightChildren}
      >
        {label}
      </FloatingLabel>
      <input
        {...props}
        ref={forwardedRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={inputStyle}
        className={cn(
          block({
            floating: label && theme !== "none",
          }),
          inputClassName
        )}
      />
    </TextFieldContainer>
  );
};

const defaultProps: DefaultProps = {
  type: "text",
  theme: "outline",
  dense: false,
  inline: false,
  error: false,
  disabled: false,
  isLeftAddon: true,
  isRightAddon: true,
  underlineDirection: "left",
};

TextField.defaultProps = defaultProps;

if (process.env.NODE_ENV !== "production") {
  TextField.displayName = "TextField";

  let PropTypes;
  try {
    PropTypes = require("prop-types");
  } catch (e) {}

  if (PropTypes) {
    TextField.propTypes = {
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
  }
}

export default forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => (
  <TextField {...props} forwardedRef={ref} />
));
