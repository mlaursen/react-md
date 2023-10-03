"use client";
import { forwardRef, type HTMLAttributes } from "react";
import { getFormConfig } from "./formConfig.js";
import { TextFieldAddon } from "./TextFieldAddon.js";
import { textFieldContainer } from "./TextFieldContainerStyles.js";
import { type TextFieldContainerOptions } from "./types.js";

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
