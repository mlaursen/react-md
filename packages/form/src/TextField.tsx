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
import { WithForwardedRef, useRefCache, useToggle } from "@react-md/utils";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import Label from "./Label";
import useFocusState from "./useFocusState";

export interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
    TextFieldContainerOptions {
  /**
   * The id for the text field. This is required for accessibility.
   */
  id: string;
  defaultValue?: string;
  label?: ReactNode;
  type?: string;
  children?: ReactNode;
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

const TextField: FC<TextFieldProps & WithRef> = providedProps => {
  const {
    containerStyle,
    containerClassName,
    className,
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
  const { id, defaultValue } = props;

  const filled = theme === "filled";
  const outline = theme === "outline";
  const underline = theme === "underline";
  const unstyled = theme === "none";
  const { focused, valued, onBlur, onFocus, onChange } = useFocusState({
    id,
    defaultValue,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
  });

  return (
    <TextFieldContainer
      style={containerStyle}
      className={containerClassName}
      inline={inline}
      theme={theme}
      error={error}
      active={focused}
      underlineDirection={underlineDirection}
      leftChildren={leftChildren}
      rightChildren={rightChildren}
    >
      <Label
        htmlFor={id}
        error={error}
        active={!unstyled && focused}
        floating={!unstyled}
        floatingActive={!unstyled && (focused || valued)}
        floatingInactive={!unstyled && !focused && valued}
        floatingActiveOutline={outline && (focused || valued)}
      >
        {label}
      </Label>
      <input
        {...props}
        autoComplete="new-password"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={forwardedRef}
        className={cn(block({ floating: !unstyled }), className)}
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
