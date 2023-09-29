"use client";
import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { getIcon } from "../icon/iconConfig.js";
import { inputToggle, type InputToggleSize } from "./inputToggleStyles.js";

/**
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Removed the `circle` and `overlay` props since they are no
 * longer needed. Added the `icon`, `readOnly`, `disableEm`, `checkedIcon` and
 * `indeterminateIcon` props.
 * @internal
 */
export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  type: "checkbox" | "radio";
  checked: boolean;

  /**
   * The icon to display while {@link checked} is `false`.
   */
  icon?: ReactNode;

  /**
   * The icon to display while {@link checked} is `true` and
   * {@link indeterminate} is `false`.
   */
  checkedIcon?: ReactNode;

  /**
   * The icon to display while both {@link checked} and {@link indeterminate}
   * are `true`.
   */
  indeterminateIcon?: ReactNode;

  /** @defaultValue `"normal"` */
  size?: InputToggleSize;

  /** @defaultValue `false` */
  error?: boolean;

  /** @defaultValue `false` */
  disabled?: boolean;

  /** @defaultValue `false` */
  readOnly?: boolean;

  /** @defaultValue `false` */
  disableEm?: boolean;

  /** @defaultValue `false` */
  indeterminate?: boolean;
}

/**
 * **Client Component**
 * This might be able to become a server component if I remove the getIcon hook
 *
 * @remarks
 * \@since 2.8.0
 * \@since 6.0.0 Updated to use different icons for each checked state instead
 * of a css overlay hack.
 * @internal
 */
export const InputToggleIcon = forwardRef<
  HTMLSpanElement,
  InputToggleIconProps
>(function InputToggleIcon(props, ref) {
  const {
    type,
    size = "normal",
    icon: propIcon,
    error,
    checked,
    children,
    disabled,
    readOnly,
    indeterminate,
    className,
    disableEm = false,
    checkedIcon: propCheckedIcon,
    indeterminateIcon: propIndeterminateIcon,
    ...remaining
  } = props;
  const uncheckedIcon = getIcon(type, propIcon);
  const checkedIcon = getIcon(`${type}Checked`, propCheckedIcon);
  const indeterminateIcon = getIcon(
    "checkboxIndeterminate",
    propIndeterminateIcon
  );
  const icon = checked
    ? indeterminate
      ? indeterminateIcon
      : checkedIcon
    : uncheckedIcon;

  return (
    <span
      {...remaining}
      ref={ref}
      className={cnb(
        inputToggle({
          em: !disableEm,
          size,
          type,
          active: checked && !error,
          disabled,
          readOnly,
          className,
        })
      )}
    >
      {icon}
      {children}
    </span>
  );
});
