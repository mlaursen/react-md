import React, { ChangeEventHandler, ReactElement, useRef } from "react";
import { MenuItem, MenuItemProps } from "@react-md/menu2";

export interface MenuItemFileInputProps
  extends Omit<MenuItemProps, "onChange"> {
  id: string;
  accept?: string;
  multiple?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function MenuItemFileInput({
  id,
  onChange,
  children,
  accept,
  multiple = false,
  ...props
}: MenuItemFileInputProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <MenuItem
      {...props}
      onClick={(event) => {
        event.stopPropagation();
        inputRef.current?.click();
      }}
    >
      {children}
      <input
        id={`${id}-input`}
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="rmd-file-input"
        value=""
        multiple={multiple}
      />
    </MenuItem>
  );
}
