import React, {
  CSSProperties,
  FC,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import cn from "classnames";
import { bem } from "@react-md/theme";
import { WithForwardedRef } from "@react-md/utils";

import FloatingLabel from "./FloatingLabel";
import TextFieldContainer, {
  TextFieldContainerOptions,
} from "./TextFieldContainer";
import useFocusState from "./useFocusState";
import useTextAreaHeightAnimation from "./useTextAreaHeightAnimation";
import useValuedState from "./useValuedState";

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

  areaStyle?: CSSProperties;
  areaClassName?: string;
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
    style: propStyle,
    className,
    areaStyle,
    areaClassName,
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
  const { style, maskRef, areaRef, update } = useTextAreaHeightAnimation({
    style: propStyle,
    ref: forwardedRef,
    rows,
    maxRows,
    defaultValue,
    disabled: resize !== "auto",
  });

  const { focused, onBlur, onFocus } = useFocusState({
    onBlur: propOnBlur,
    onFocus: propOnFocus,
  });
  const { valued, onChange } = useValuedState({
    defaultValue,
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
      style={style}
      className={className}
      inline={inline}
      theme={theme}
      error={error}
      active={focused}
      growable={growable}
      underlineDirection={underlineDirection}
    >
      <FloatingLabel
        htmlFor={id}
        error={error}
        active={focused}
        covering={!outline}
        valued={valued}
      >
        {label}
      </FloatingLabel>
      {growable && (
        <textarea
          aria-hidden
          readOnly
          tabIndex={-1}
          ref={maskRef}
          style={areaStyle}
          className={cn(mergedClassName, "rmd-text-field--mask", areaClassName)}
        />
      )}
      <textarea
        {...props}
        ref={areaRef}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={areaStyle}
        className={cn(mergedClassName, areaClassName)}
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
