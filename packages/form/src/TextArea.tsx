import React, {
  FC,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import Label from "./Label";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import useFocusState from "./useFocusState";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextFieldContainerOptions {
  id: string;
  label?: ReactNode;
  defaultValue?: string;
  resizable?: boolean | "horizontal" | "vertical";
}

type WithRef = WithForwardedRef<HTMLTextAreaElement>;
type DefaultProps = Required<
  Pick<
    TextAreaProps,
    "theme" | "resizable" | "defaultValue" | "underlineDirection" | "error"
  >
>;
type WithDefaultProps = TextAreaProps & DefaultProps & WithRef;

const block = bem("rmd-text-field");

const TextArea: FC<TextAreaProps & WithRef> = providedProps => {
  const {
    containerStyle,
    containerClassName,
    className,
    forwardedRef,
    resizable,
    label,
    theme,
    error,
    inline: propInline,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    underlineDirection,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, defaultValue } = props;
  let inline = propInline;
  if (typeof propInline !== "boolean") {
    inline = resizable !== "vertical";
  }

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
      <textarea
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        ref={forwardedRef}
        className={cn(
          block({
            area: true,
            outline,
            underline: underline || filled,
            floating: !unstyled,
            unresizable: !resizable,
          }),
          className
        )}
      />
    </TextFieldContainer>
  );
};

const defaultProps: DefaultProps = {
  theme: "underline",
  error: false,
  resizable: true,
  defaultValue: "",
  underlineDirection: "left",
};

TextArea.defaultProps = defaultProps;

export default forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
  <TextArea {...props} forwardedRef={ref} />
));
