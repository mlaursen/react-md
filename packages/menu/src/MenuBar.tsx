import type { ReactElement } from "react";
import { KeyboardMovementProvider } from "@react-md/utils";

import type { HoverableMenuBar } from "./MenuBarProvider";
import { MenuBarProvider } from "./MenuBarProvider";
import type { MenuBarWidgetProps } from "./MenuBarWidget";
import { MenuBarWidget } from "./MenuBarWidget";

/** @remarks \@since 5.0.0 */
export type MenuBarProps = MenuBarWidgetProps & HoverableMenuBar;

/**
 * The `MenuBar` component is used to link child `DropdownGroup`s' visibility
 * together and following the specs for a
 * [menubar](https://www.w3.org/TR/wai-aria-practices/#menu).
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { MenuBar, DropdownMenu, MenuItem } from "@react-md/menu";
 *
 * function Example(): ReactElement {
 *   return (
 *     <MenuBar aria-label="Example">
 *       <DropdownMenu id="menubar-item-1" buttonChildren="Item 1">
 *         <MenuItem>Sub-item 1</MenuItem>
 *         <MenuItem>Sub-item 2</MenuItem>
 *       </DropdownMenu>
 *       <DropdownMenu id="menubar-item-2" buttonChildren="Item 2">
 *         <MenuItem>Sub-item 1</MenuItem>
 *         <MenuItem>Sub-item 2</MenuItem>
 *       </DropdownMenu>
 *     </MenuBar>
 *   );
 * }
 * ```
 *
 * @remarks \@since 5.0.0
 */
export function MenuBar({
  hoverTimeout,
  ...props
}: MenuBarProps): ReactElement {
  return (
    <MenuBarProvider hoverTimeout={hoverTimeout}>
      <KeyboardMovementProvider
        loopable
        searchable
        incrementKeys={["ArrowRight"]}
        decrementKeys={["ArrowLeft"]}
      >
        <MenuBarWidget {...props} />
      </KeyboardMovementProvider>
    </MenuBarProvider>
  );
}
