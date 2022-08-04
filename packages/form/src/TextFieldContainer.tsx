import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cnb } from "cnbuilder";
import { useFormTheme } from "./FormThemeProvider";
import type { FormComponentStates, FormThemeOptions } from "./types";
import { bem } from "@react-md/core";
import { TextFieldAddon } from "./TextFieldAddon";

const styles = bem("rmd-text-field-container");

export interface TextFieldContainerClassNameOptions
  extends FormThemeOptions,
    FormComponentStates {
  className?: string;
  dense?: boolean;
  inline?: boolean;
  stretch?: boolean;
  label?: boolean;
  leftAddon?: boolean;
  rightAddon?: boolean;
}

export function textFieldContainer(
  options: TextFieldContainerClassNameOptions = {}
): string {
  const {
    className,
    theme = "outline",
    dense = false,
    error = false,
    label = false,
    active = false,
    inline = false,
    stretch = false,
    readOnly = false,
    disabled = false,
    leftAddon = false,
    rightAddon = false,
    underlineDirection = "left",
  } = options;
  const underline = theme === "underline";
  const outline = theme === "outline";
  const filled = theme === "filled";
  const isUnderlined = underline || filled;
  const isOutlineActive = outline && active;

  return cnb(
    styles({
      error,
      inline,
      stretch,
      filled,
      outline,
      disabled: disabled || readOnly,
      hoverable: !disabled && !isOutlineActive,
      label: label && !dense,
      dense: !label && dense,
      "dense-label": label && dense,
      "dense-placeholder": !label && dense && isUnderlined,
      "outline-active": isOutlineActive,
      "outline-error": outline && error,
      "outline-left": outline && leftAddon,
      "outline-right": outline && rightAddon,
      underline: isUnderlined,
      "underline-labelled": isUnderlined && label,
      "underline-active": isUnderlined && active,
      [`underline-${underlineDirection}`]: isUnderlined,
      "underline-left-addon": isUnderlined && leftAddon,
      "underline-right-addon": isUnderlined && rightAddon,
    }),
    className
  );
}

export interface TextFieldContainerOptions
  extends FormThemeOptions,
    FormComponentStates {
  dense?: boolean;
  inline?: boolean;
  stretch?: boolean;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
}

export interface TextFieldContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextFieldContainerOptions {
  label?: boolean;
  leftAddon?: ReactNode;
  disableLeftAddonStyles?: boolean;
  rightAddon?: ReactNode;
  disableRightAddonStyles?: boolean;
}

export const TextFieldContainer = forwardRef<
  HTMLDivElement,
  TextFieldContainerProps
>(function TextFieldContainer(props, ref) {
  const {
    children,
    className,
    dense = false,
    error = false,
    label = false,
    active = false,
    inline = false,
    stretch = false,
    readOnly = false,
    disabled = false,
    leftAddon,
    disableLeftAddonStyles = false,
    rightAddon,
    disableRightAddonStyles = false,
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
    ...remaining
  } = props;
  const { theme, underlineDirection } = useFormTheme({
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
  });

  return (
    <div
      {...remaining}
      ref={ref}
      className={textFieldContainer({
        theme,
        dense,
        error,
        label,
        inline,
        active,
        stretch,
        readOnly,
        disabled,
        className,
        leftAddon: !!leftAddon,
        rightAddon: !!rightAddon,
        underlineDirection,
      })}
    >
      <TextFieldAddon disabled={disableLeftAddonStyles}>
        {leftAddon}
      </TextFieldAddon>
      {children}
      <TextFieldAddon disabled={disableRightAddonStyles}>
        {rightAddon}
      </TextFieldAddon>
    </div>
  );
});
