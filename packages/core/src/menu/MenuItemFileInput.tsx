"use client";

import {
  type ChangeEventHandler,
  type InputHTMLAttributes,
  forwardRef,
} from "react";

import { getIcon } from "../icon/config.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { MenuItem, type MenuItemProps } from "./MenuItem.js";

const noop = (): void => {
  // do nothing
};

/**
 * @since 6.0.0 Removed most of the shared `FileInputProps` from this
 * implementation.
 */
export interface MenuItemFileInputProps
  extends
    Omit<MenuItemProps, "onChange">,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      "accept" | "capture" | "multiple"
    > {
  /**
   * A change event handler that should do something with the selected files.
   * Usually the `onChange` returned by `useFileUpload` or:
   *
   * ```ts
   * onChange={(event) => {
   *   const { files } = event.currentTarget;
   *   // do something with files
   * }}
   * ```
   *
   * This is actually a native `Event` and not a `SyntheticEvent` because the
   * file input is created through `document.createElement` instead of `React`.
   * You can still access the files through `event.currentTarget.files` like
   * normal.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;

  /**
   * Set this to `true` if the `Menu` should not close when the file input's
   * menu item is clicked.
   *
   * @defaultValue `false`
   */
  preventMenuHideOnClick?: boolean;
}

/**
 * **Client Component**
 *
 * A wrapper for the `<input type="file">` element that works within menus.
 *
 * @see {@link https://react-md.dev/components/menu#menuitemfileinput-example | DropdownMenu Demos}
 * @since 5.0.0
 * @since 6.0.0 No longer creates an invisible file input element within the
 * menu item. This allows the menu to be closed immediately when this menu item
 * is clicked.
 */
export const MenuItemFileInput = forwardRef<
  HTMLLIElement,
  MenuItemFileInputProps
>(function MenuItemFileInput(props, ref) {
  const {
    id: propId,
    onClick = noop,
    onChange,
    accept,
    capture,
    multiple,
    children,
    leftAddon: propLeftAddon,
    preventMenuHideOnClick = false,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "menu-item");
  const leftAddon = getIcon("upload", propLeftAddon);

  return (
    <MenuItem
      {...remaining}
      id={id}
      ref={ref}
      leftAddon={leftAddon}
      onClick={(event) => {
        onClick(event);

        if (preventMenuHideOnClick) {
          event.stopPropagation();
        }

        // Since the menu closes when the menu item is clicked causing the
        // elements to be removed from the DOM, a normal `<input type="file" />`
        // can't be used. Instead, create a temporary file input element and
        // click it to trigger the file upload behavior.
        let input: HTMLInputElement | null = document.createElement("input");
        input.type = "file";
        if (accept) {
          input.accept = accept;
        }
        if (multiple) {
          input.multiple = multiple;
        }
        if (capture) {
          input.capture = capture === true ? "" : capture;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        input.onchange = onChange;
        input.click();
        input = null;
      }}
    >
      {children}
    </MenuItem>
  );
});
