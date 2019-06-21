import React, {
  FC,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useRef,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef, applyRef } from "@react-md/utils";

import Label from "./Label";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import useFocusState from "./useFocusState";
import useTextAreaHeightAnimation from "./useTextAreaHeightAnimation";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextFieldContainerOptions {
  /**
   * An id for the textarea. This is required for a11y.
   */
  id: string;

  /**
   * An optional label to display with the textarea. This will be wrapped in the `<Label>`
   * component and required props.
   */
  label?: ReactNode;

  /**
   * The default value to display.
   */
  defaultValue?: string;

  /**
   *
   */
  resize?: "auto" | "horizontal" | "vertical" | "both";

  /**
   *
   */
  rows?: number;

  /**
   * The max number of lines that an animatiable textarea
   */
  maxRows?: number;
}

type WithRef = WithForwardedRef<HTMLTextAreaElement>;
type DefaultProps = Required<
  Pick<
    TextAreaProps,
    | "theme"
    | "resize"
    | "defaultValue"
    | "underlineDirection"
    | "error"
    | "rows"
    | "maxRows"
  >
>;
type WithDefaultProps = TextAreaProps & DefaultProps & WithRef;

const block = bem("rmd-text-field");

const TextArea: FC<TextAreaProps & WithRef> = providedProps => {
  const {
    containerStyle: propContainerStyle,
    containerClassName,
    className,
    forwardedRef,
    resize,
    label,
    theme,
    error,
    inline: propInline,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: propOnChange,
    underlineDirection,
    maxRows,
    ...props
  } = providedProps as WithDefaultProps;
  const { id, defaultValue, rows } = props;
  let inline = propInline;
  if (typeof propInline !== "boolean") {
    inline = resize === "horizontal" || resize === "both";
  }

  const filled = theme === "filled";
  const outline = theme === "outline";
  const underline = theme === "underline";
  const unstyled = theme === "none";
  const growable = resize === "auto";
  const {
    containerStyle,
    maskRef,
    areaRef,
    update,
  } = useTextAreaHeightAnimation({
    propStyle: propContainerStyle,
    ref: forwardedRef,
    rows,
    maxRows,
    defaultValue,
    disabled: resize !== "auto",
  });

  const { focused, valued, onBlur, onFocus, onChange } = useFocusState({
    id,
    defaultValue,
    onBlur: propOnBlur,
    onFocus: propOnFocus,
    onChange: evt => {
      const event = evt as React.ChangeEvent<HTMLTextAreaElement>;
      if (propOnChange) {
        propOnChange(event);
      }

      update(event.currentTarget.value);
    },
  });

  const mergedClassName = block({
    area: true,
    "area-underline": underline || filled,
    outline,
    underline: underline || filled,
    floating: !unstyled && label,
    unresizable: growable,
    "resize-h": resize === "horizontal",
    "resize-v": resize === "vertical",
  });

  return (
    <TextFieldContainer
      style={containerStyle}
      className={containerClassName}
      inline={inline}
      theme={theme}
      error={error}
      active={focused}
      growable={growable}
      underlineDirection={underlineDirection}
    >
      <Label
        htmlFor={id}
        error={error}
        active={!unstyled && focused}
        floating={!unstyled}
        floatingSurface={!unstyled && !outline}
        floatingActive={!unstyled && (focused || valued)}
        floatingInactive={!unstyled && !focused && valued}
        floatingActiveOutline={outline && (focused || valued)}
      >
        {label}
      </Label>
      {growable && (
        <textarea
          aria-hidden
          readOnly
          tabIndex={-1}
          ref={maskRef}
          style={props.style}
          className={cn(mergedClassName, "rmd-text-field--mask", className)}
        />
      )}
      <textarea
        {...props}
        ref={areaRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        className={cn(mergedClassName, className)}
      />
    </TextFieldContainer>
  );
};

const defaultProps: DefaultProps = {
  theme: "underline",
  error: false,
  resize: "auto",
  defaultValue: "",
  rows: 2,
  maxRows: -1,
  underlineDirection: "left",
};

TextArea.defaultProps = defaultProps;

export default forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => (
  <TextArea {...props} forwardedRef={ref} />
));
