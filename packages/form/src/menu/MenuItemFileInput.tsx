import type { InputHTMLAttributes } from "react";
import { forwardRef, useRef } from "react";
import cn from "classnames";
import { useIcon } from "@react-md/icon";
import type { MenuItemProps } from "@react-md/menu";
import { MenuItem } from "@react-md/menu";

import type { FileInputProps } from "../file-input/FileInput";

/**
 * @remarks \@since 5.0.0
 */
export type MenuItemAllowedFileInputProps = Pick<
  FileInputProps,
  "id" | "onChange" | "accept" | "multiple" | "disableRepeatableFiles"
>;

/** @remarks \@since 5.0.0 */
export interface MenuItemFileInputProps
  extends Omit<MenuItemProps, "id" | "onChange">,
    MenuItemAllowedFileInputProps {
  /**
   * An `aria-label` to apply to the `<input type="file">`.
   *
   * @defaultValue `"Upload"`
   */
  inputLabel?: string;

  /**
   * Any additional props that should be passed to the `<input type="file">`
   * element. You probably won't ever need to use this.
   */
  inputProps?: Readonly<
    Omit<
      InputHTMLAttributes<HTMLInputElement>,
      "type" | keyof MenuItemAllowedFileInputProps
    >
  >;
}

/**
 * A wrapper for the `<input type="file">` element that works within menus.
 *
 * @remarks \@since 5.0.0
 */
export const MenuItemFileInput = forwardRef<
  HTMLLIElement,
  MenuItemFileInputProps
>(function MenuItemFileInput(
  {
    id,
    onClick,
    onChange,
    accept,
    multiple = false,
    children,
    inputProps,
    disableRepeatableFiles = false,
    leftAddon: propLeftAddon,
    inputLabel = "Upload",
    ...props
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const leftAddon = useIcon("upload", propLeftAddon);

  return (
    <MenuItem
      {...props}
      id={`${id}-menuitem`}
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        // prevent the menu from closing since you need access to the
        // `<input type="file">` to select a file and the menu unmounts when
        // hidden.
        event.stopPropagation();
        /* istanbul-ignore-next */
        inputRef.current?.click();
      }}
      leftAddon={leftAddon}
    >
      {children}
      <input
        aria-label={inputLabel}
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        value={disableRepeatableFiles ? undefined : ""}
        onChange={onChange}
        {...inputProps}
        onClick={(event) => {
          inputProps?.onClick?.(event);
          // prevent double click events since the MenuItem clicks this input
          event.stopPropagation();
        }}
        className={cn("rmd-file-input", inputProps?.className)}
      />
    </MenuItem>
  );
});
