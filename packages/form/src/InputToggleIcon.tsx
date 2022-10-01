import { useIcon } from "@react-md/icon";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { InputToggleSize } from "./InputToggle";
import { inputToggle } from "./InputToggle";

export interface InputToggleIconProps extends HTMLAttributes<HTMLSpanElement> {
  type: "checkbox" | "radio";
  icon?: ReactNode;
  size?: InputToggleSize;
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  checkedIcon?: ReactNode;
  indeterminateIcon?: ReactNode;
}

export const InputToggleIcon = forwardRef<
  HTMLSpanElement,
  InputToggleIconProps
>(function InputToggleIcon(props, ref) {
  const {
    type,
    size = "normal",
    icon: propIcon,
    checked,
    children,
    disabled,
    indeterminate,
    className,
    checkedIcon: propCheckedIcon,
    indeterminateIcon: propIndeterminateIcon,
    ...remaining
  } = props;
  const uncheckedIcon = useIcon(type, propIcon);
  const checkedIcon = useIcon(`${type}Checked`, propCheckedIcon);
  const indeterminateIcon = useIcon(
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
          size,
          type,
          active: checked,
          disabled,
          className,
        })
      )}
    >
      {icon}
      {children}
    </span>
  );
});
