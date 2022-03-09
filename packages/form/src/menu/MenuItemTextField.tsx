import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import cn from "classnames";
import type { PropsWithRef } from "@react-md/utils";
import { useKeyboardFocusableElement } from "@react-md/utils";

import type { TextFieldProps } from "../text-field/TextField";
import { TextField } from "../text-field/TextField";

/**
 * @remarks \@since 5.0.0
 */
export interface MenuItemTextFieldProps extends TextFieldProps {
  /**
   * Any additional props or a `ref` to apply to the surrounding `<li>` element.
   */
  liProps?: Readonly<
    PropsWithRef<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
  >;
}

/**
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
>(function MenuItemTextField(
  { liProps, onKeyDown, stretch = true, ...props },
  nodeRef
) {
  const refCallback = useKeyboardFocusableElement(nodeRef);
  return (
    <li
      role="none"
      {...liProps}
      onClick={(event) => {
        liProps?.onClick?.(event);
        event.stopPropagation();
      }}
      className={cn("rmd-list-item rmd-menu-item", liProps?.className)}
    >
      <TextField
        {...props}
        ref={refCallback}
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
