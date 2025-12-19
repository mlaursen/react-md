import { cnb } from "cnbuilder";
import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";

import { getIcon } from "../icon/config.js";
import { FORM_CONFIG } from "./formConfig.js";
import { type InputToggleSize, inputToggle } from "./inputToggleStyles.js";

/**
 * @since 2.8.0
 * @since 6.0.0 Removed the `circle` and `overlay` props since they are no
 * longer needed. Added the `icon`, `disableEm`, `checkedIcon` and
 * `indeterminateIcon` props.
 * @internal
 */
export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;

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
export function InputToggleIcon(props: InputToggleIconProps): ReactElement {
  const {
    ref,
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
    if (checked) {
      icon = indeterminate ? indeterminateIcon : checkedIcon;
    } else {
      icon = uncheckedIcon;
    }
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
}
