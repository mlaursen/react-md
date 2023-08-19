"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { PropsWithRef } from "../types.js";
import type { TextFieldProps } from "./TextField.js";
import { TextField } from "./TextField.js";

/**
 * @remarks \@since 5.0.0
 */
export interface MenuItemTextFieldProps extends TextFieldProps {
  /**
   * Any additional props or a `ref` to apply to the surrounding `<li>` element.
   */
  liProps?: PropsWithRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
}

/**
 * **Client Component**
 *
 * This is a wrapper for the `TextField` component that can be used within
 * `Menu`s by updating the `onKeyDown` and `onClick` behavior.
 *
 * Note: This is **not** the `TextFieldWithMessage` since the message part is
 * hard to style nicely within menus. You'd most likely want to use another menu
 * for displaying errors.
 *
 * @remarks \@since 5.0.0
 */
export const MenuItemTextField = forwardRef<
  HTMLInputElement,
  MenuItemTextFieldProps
>(function MenuItemTextField(props, ref) {
  const { liProps, onKeyDown, stretch = true, ...remaining } = props;
  return (
    <li
      role="none"
      {...liProps}
      onClick={(event) => {
        liProps?.onClick?.(event);
        event.stopPropagation();
      }}
      className={cnb("rmd-list-item rmd-menu-item", liProps?.className)}
    >
      <TextField
        {...remaining}
        ref={ref}
        stretch={stretch}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          switch (event.key) {
            case "Tab":
            case "Escape":
            case " ":
              // do default behavior
              break;
            default:
              if (event.key.length === 1 || event.currentTarget.value) {
                event.stopPropagation();
              }
          }
        }}
      />
    </li>
  );
});
