"use client";
import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes } from "react";
import { cssUtils, type TextColor, type ThemeColor } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { useFormTheme } from "./FormThemeProvider.js";
import { TextFieldAddon } from "./TextFieldAddon.js";
import {
  type FormComponentStates,
  type FormThemeOptions,
  type TextFieldContainerOptions,
} from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-form-text-height"?: string | number;
    "--rmd-form-text-padding-left"?: string | number;
    "--rmd-form-text-padding-right"?: string | number;
    "--rmd-form-text-padding-top"?: string | number;
    "--rmd-form-text-border-color"?: string;
    "--rmd-form-text-hover-border-color"?: string;
    "--rmd-form-text-filled-color"?: string;
    "--rmd-form-addon-top"?: string | number;
    "--rmd-form-addon-margin-top"?: string | number;
  }
}

const styles = bem("rmd-text-field-container");

/** @remarks \@since 6.0.0 */
export interface TextFieldContainerClassNameOptions
  extends FormThemeOptions,
    FormComponentStates {
  className?: string;

  /** @defaultValue `false` */
  dense?: boolean;

  /** @defaultValue `false` */
  inline?: boolean;

  /** @defaultValue `false` */
  stretch?: boolean;

  /** @defaultValue `false` */
  label?: boolean;

  /** @defaultValue `false` */
  leftAddon?: boolean;

  /** @defaultValue `false` */
  rightAddon?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
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

  let textColor: ThemeColor | TextColor | undefined;
  if (disabled) {
    textColor = "text-disabled";
  } else if (error) {
    textColor = "error";
  }

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
    cssUtils({
      textColor,
    }),
    className
  );
}

export interface TextFieldContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    TextFieldContainerOptions {
  /**
   * Set this to `true` if there is a floating label with the `TextField` or
   * `TextArea`.
   *
   * @defaultValue `false`
   */
  label?: boolean;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the useFormTheme hook
 *
 * This component is used to add the additional `TextField`, `TextArea`, and
 * `Select` theme styles.
 *
 * @internal
 */
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
      <TextFieldAddon disabled={disableRightAddonStyles} after>
        {rightAddon}
      </TextFieldAddon>
    </div>
  );
});
