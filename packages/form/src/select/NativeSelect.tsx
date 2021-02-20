import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  Ref,
  SelectHTMLAttributes,
} from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import { bem } from "@react-md/utils";

import { useFormTheme } from "../FormThemeProvider";
import { FloatingLabel } from "../label/FloatingLabel";
import {
  TextFieldContainer,
  TextFieldContainerOptions,
} from "../text-field/TextFieldContainer";
import { useFieldStates } from "../useFieldStates";

export interface NativeSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    TextFieldContainerOptions {
  /**
   * The id for the select. This is required for accessibility.
   */
  id: string;

  /**
   * An optional ref to apply to the text field's container div element. The
   * default ref is forwarded on to the `input` element.
   */
  containerRef?: Ref<HTMLDivElement>;

  /**
   * An optional icon to display to the right of the select. This should
   * normally be a dropdown icon to replace the native select's dropdown icon.
   * If this is set to `null`, the native select's dropdown icon will be
   * displayed instead.
   *
   * This defaults to the `IconProvider`'s dropdown icon from the
   * `@react-md/icon` package.
   */
  icon?: ReactNode;

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
   * An optional style to apply to the select itself. The `style` prop will be
   * applied to the container `<div>` instead.
   */
  selectStyle?: CSSProperties;

  /**
   * An optional className to apply to the select itself. The `className` prop
   * will be applied to the container `<div>` instead.
   */
  selectClassName?: string;

  /**
   * The value to use for the text field. This will make the component
   * controlled and require the `onChange` prop to be provided as well otherwise
   * this will act as a read only text field.
   *
   * If the `multiple` prop is enabled, this **must** be a list of strings.
   */
  value?: string | string[];

  /**
   * The default value for the text field which will make it uncontrolled. If
   * you manually change the `defaultValue` prop, the input's value **will not
   * change** unless you provide a different `key` as well. Use the `value` prop
   * instead for a controlled input.
   *
   * If the `multiple` prop is enabled, this **must** be a list of strings.
   */
  defaultValue?: string | string[];
}

const block = bem("rmd-native-select");
const container = bem("rmd-native-select-container");

/**
 * This component is used to render a native `<select>` element with the text
 * field theme styles. This component is great to use for native behavior and
 * full accessibility.
 */
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(
    {
      style,
      className,
      labelStyle,
      labelClassName,
      selectStyle,
      selectClassName,
      icon: propIcon,
      theme: propTheme,
      dense = false,
      inline = false,
      error = false,
      disabled = false,
      label,
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      onChange: propOnChange,
      containerRef,
      isLeftAddon,
      isRightAddon,
      leftChildren,
      rightChildren,
      underlineDirection: propUnderlineDirection,
      children,
      ...props
    },
    ref
  ) {
    const { id, value, defaultValue, multiple } = props;
    const { theme, underlineDirection } = useFormTheme({
      theme: propTheme,
      underlineDirection: propUnderlineDirection,
    });
    const underline = theme === "underline" || theme === "filled";

    const icon = useIcon("dropdown", propIcon);
    const { valued, focused, onBlur, onFocus, onChange } = useFieldStates({
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      onChange: propOnChange,
      value,
      defaultValue,
    });

    return (
      <TextFieldContainer
        style={style}
        className={cn(
          container({
            multi: multiple,
            padded: multiple && label,
          }),
          className
        )}
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
        rightChildren={multiple && rightChildren}
        underlineDirection={underlineDirection}
      >
        <FloatingLabel
          style={labelStyle}
          className={cn(block("label"), labelClassName)}
          htmlFor={id}
          error={error}
          active={valued && focused}
          valued={valued}
          floating={valued || multiple}
          dense={dense}
          disabled={disabled}
        >
          {label}
        </FloatingLabel>
        <select
          {...props}
          ref={ref}
          style={selectStyle}
          className={cn(
            block({
              icon,
              multi: multiple,
              "label-underline": label && underline,
              "placeholder-underline": !label && underline,
              floating: label && theme !== "none",
            }),
            selectClassName
          )}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        >
          {children}
        </select>
        {!multiple && icon && <span className={block("icon")}>{icon}</span>}
      </TextFieldContainer>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    NativeSelect.propTypes = {
      id: PropTypes.string.isRequired,
      style: PropTypes.object,
      className: PropTypes.string,
      labelStyle: PropTypes.object,
      labelClassName: PropTypes.string,
      selectStyle: PropTypes.object,
      selectClassName: PropTypes.string,
      icon: PropTypes.node,
      value: PropTypes.string,
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      theme: PropTypes.oneOf(["none", "underline", "filled", "outline"]),
      dense: PropTypes.bool,
      error: PropTypes.bool,
      inline: PropTypes.bool,
      disabled: PropTypes.bool,
      underlineDirection: PropTypes.oneOf(["left", "center", "right"]),
      isLeftAddon: PropTypes.bool,
      leftChildren: PropTypes.node,
      rightChildren: PropTypes.node,
      isRightAddon: PropTypes.bool,
      multiple: PropTypes.bool,
      size: PropTypes.number,
      children: PropTypes.node,
      label: PropTypes.node,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onChange: PropTypes.func,
      containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    };
  } catch (e) {}
}
