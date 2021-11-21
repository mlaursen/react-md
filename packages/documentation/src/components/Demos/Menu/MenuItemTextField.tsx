import React, { ReactElement, useRef } from "react";
import { TextField, TextFieldProps } from "@react-md/form";
import { MenuItem, MenuItemProps } from "@react-md/menu2";

export interface MenuItemTextFieldProps extends TextFieldProps {
  menuProps?: Readonly<MenuItemProps>;
}

export function MenuItemTextField({
  id,
  menuProps,
  dense = true,
  ...props
}: MenuItemTextFieldProps): ReactElement {
  const textFieldRef = useRef<HTMLInputElement>(null);
  return (
    <MenuItem
      id={`${id}-menu-item`}
      {...menuProps}
      onClick={(event) => {
        menuProps?.onClick?.(event);
        event.stopPropagation();
      }}
      onFocus={(event) => {
        menuProps?.onFocus?.(event);
        if (event.isPropagationStopped()) {
          return;
        }

        event.stopPropagation();
        textFieldRef.current?.focus();
      }}
    >
      <TextField
        {...props}
        id={id}
        ref={textFieldRef}
        dense={dense}
        onKeyDown={(event) => {
          switch (event.key) {
            case "Tab":
            case "Escape":
              // do default behavior
              break;
            case " ":
              event.stopPropagation();
              break;
            default:
              if (event.key.length === 1 || event.currentTarget.value) {
                event.stopPropagation();
              }
          }
        }}
      />
    </MenuItem>
  );
}
