import * as React from "react";
import MenuItem, { IMenuItemProps } from "./MenuItem";
import { FakeFormChangeEventHandler } from "./types";

export interface IMenuItemRadioProps extends IMenuItemProps {
  checked: boolean;
  onCheckedChange: FakeFormChangeEventHandler;
}

const MenuItemRadio: React.FunctionComponent<IMenuItemRadioProps> = ({
  onClick,
  onCheckedChange,
  checked,
  forwardedRef,
  ...props
}) => (
  <MenuItem
    {...props}
    ref={forwardedRef}
    role="menuitemradio"
    aria-checked={checked}
    onClick={(event: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) {
        onClick(event);
      }

      onCheckedChange(!checked, event);
    }}
  />
);

export default React.forwardRef<HTMLLIElement, IMenuItemRadioProps>(
  (props, ref) => <MenuItemRadio {...props} forwardedRef={ref} />
);
