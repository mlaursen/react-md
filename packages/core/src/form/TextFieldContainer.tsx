"use client";

import { type HTMLAttributes, forwardRef } from "react";

import { TextFieldAddon } from "./TextFieldAddon.js";
import { getFormConfig } from "./formConfig.js";
import { textFieldContainer } from "./textFieldContainerStyles.js";
import { type TextFieldContainerOptions } from "./types.js";

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
    dense,
    error,
    label,
    active,
    inline,
    readOnly,
    disabled,
    leftAddon,
    leftAddonProps,
    disableLeftAddonStyles,
    rightAddon,
    rightAddonProps,
    disableRightAddonStyles,
    theme: propTheme,
    underlineDirection: propUnderlineDirection,
    ...remaining
  } = props;
  const theme = getFormConfig("theme", propTheme);
  const underlineDirection = getFormConfig(
    "underlineDirection",
    propUnderlineDirection
  );

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
        readOnly,
        disabled,
        className,
        leftAddon: !!leftAddon && !disableLeftAddonStyles,
        rightAddon: !!rightAddon && !disableRightAddonStyles,
        underlineDirection,
      })}
    >
      <TextFieldAddon {...leftAddonProps} disabled={disableLeftAddonStyles}>
        {leftAddon}
      </TextFieldAddon>
      {children}
      <TextFieldAddon
        {...rightAddonProps}
        disabled={disableRightAddonStyles}
        after
      >
        {rightAddon}
      </TextFieldAddon>
    </div>
  );
});
