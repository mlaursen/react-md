import { cnb } from "cnbuilder";
import { cssUtils, type TextColor, type ThemeColor } from "../cssUtils.js";
import { bem } from "../utils/bem.js";
import { type FormComponentStates, type FormThemeOptions } from "./types.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-text-field-height"?: string | number;
    "--rmd-text-field-padding-left"?: string | number;
    "--rmd-text-field-padding-right"?: string | number;
    "--rmd-text-field-padding-top"?: string | number;
    "--rmd-text-field-border-color"?: string;
    "--rmd-text-field-hover-border-color"?: string;
    "--rmd-text-field-filled-color"?: string;
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
      "underline-placeholder": isUnderlined && !label,
      "underline-placeholder-only":
        isUnderlined && !label && !leftAddon && !rightAddon,
      "underline-labelled": isUnderlined && label,
      "underline-active": isUnderlined && active,
      [`underline-${underlineDirection}`]: isUnderlined,
      "underline-left-addon": isUnderlined && leftAddon,
      "underline-right-addon": isUnderlined && rightAddon,
    }),
    cssUtils({ textColor, fullWidth: !inline }),
    className
  );
}
