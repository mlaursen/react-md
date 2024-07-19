import { cnb } from "cnbuilder";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { getIcon } from "../icon/iconConfig.js";
import { FORM_CONFIG } from "./formConfig.js";
import { inputToggle, type InputToggleSize } from "./inputToggleStyles.js";

/**
 * @since 2.8.0
 * @since 6.0.0 Removed the `circle` and `overlay` props since they are no
 * longer needed. Added the `icon`, `disableEm`, `checkedIcon` and
 * `indeterminateIcon` props.
 * @internal
 */
export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  type: "checkbox" | "radio";
  /**
   * Note: If this is `undefined` and the {@link FORM_CONFIG.uncontrolledToggles} is `false`,
   * the icon state won't work.
   */
  checked?: boolean;

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
  disableEm?: boolean;

  /** @defaultValue `false` */
  indeterminate?: boolean;
}

/**
 * @since 2.8.0
 * @since 6.0.0 Updated to use different icons for each checked state instead
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

  let icon: ReactNode;
  let active = false;
  const uncontrolled = typeof checked !== "boolean";
  if (!uncontrolled || !FORM_CONFIG.uncontrolledToggles) {
    active = !!checked && !error;
    icon = checked
      ? indeterminate
        ? indeterminateIcon
        : checkedIcon
      : uncheckedIcon;
  } else {
    icon = (
      <>
        {uncheckedIcon}
        {indeterminate ? indeterminateIcon : checkedIcon}
      </>
    );
  }

  return (
    <span
      {...remaining}
      ref={ref}
      className={cnb(
        inputToggle({
          em: !disableEm,
          size,
          type,
          error,
          active,
          disabled,
          uncontrolled,
          className,
        })
      )}
    >
      {children}
      {icon}
    </span>
  );
});
