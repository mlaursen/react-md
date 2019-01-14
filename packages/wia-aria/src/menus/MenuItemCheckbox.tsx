import React, { useState } from "react";

import MenuItem, { IMenuItemProps } from "./MenuItem";
import { FakeFormChangeEventHandler } from "./types";

export interface IMenuItemCheckboxProps extends IMenuItemProps {
  checked?: boolean | "mixed";
  defaultChecked?: boolean;
  onCheckedChange?: FakeFormChangeEventHandler;
}

export interface IMenuItemCheckboxDefaultProps {
  defaultChecked: boolean;
}

const MenuItemCheckbox: React.FunctionComponent<IMenuItemCheckboxProps> = ({
  checked: propChecked,
  defaultChecked,
  onClick,
  onCheckedChange,
  forwardedRef,
  ...props
}) => {
  let checked = propChecked;
  let handleChange = onCheckedChange;
  if (typeof propChecked === "undefined") {
    const [isChecked, setChecked] = useState(defaultChecked);
    checked = isChecked;
    handleChange = nextChecked => setChecked(nextChecked);
  }

  return (
    <MenuItem
      {...props}
      ref={forwardedRef}
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={(event: React.MouseEvent<HTMLLIElement>) => {
        if (onClick) {
          onClick(event);
        }

        handleChange && handleChange(!checked, event);
      }}
    />
  );
};

const defaultProps: IMenuItemCheckboxDefaultProps = {
  defaultChecked: false,
};

MenuItemCheckbox.defaultProps = defaultProps;

export default React.forwardRef<HTMLLIElement, IMenuItemCheckboxProps>(
  (props, ref) => <MenuItemCheckbox {...props} forwardedRef={ref} />
);
