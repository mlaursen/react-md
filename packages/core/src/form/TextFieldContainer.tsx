"use client";

import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { TextFieldAddon } from "./TextFieldAddon.js";
import { getFormConfig } from "./formConfig.js";
import { textFieldContainer } from "./textFieldContainerStyles.js";
import { type TextFieldContainerOptions } from "./types.js";

export interface TextFieldContainerProps
  extends HTMLAttributes<HTMLDivElement>, TextFieldContainerOptions {
  ref?: Ref<HTMLDivElement>;

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
export function TextFieldContainer(
  props: TextFieldContainerProps
): ReactElement {
  const {
    ref,
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
}
