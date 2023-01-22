import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { bem } from "../utils";

import { useFormTheme } from "./FormThemeProvider";
import { TextFieldAddon } from "./TextFieldAddon";
import type {
  FormComponentStates,
  FormThemeOptions,
  TextFieldContainerOptions,
} from "./types";

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