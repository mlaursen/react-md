import type { ListProps } from "@react-md/core";
import {
  KeyboardMovementProvider,
  List,
  useKeyboardMovementProvider,
} from "@react-md/core";
import { forwardRef } from "react";
import { MenuBarProvider, useMenuBarProvider } from "./useMenuBarProvider";

export interface MenuBarProps extends Omit<ListProps, "role"> {
  /**
   * @defaultValue `true`
   */
  horizontal?: boolean;

  hoverTimeout?: number;
}

export const MenuBar = forwardRef<HTMLUListElement, MenuBarProps>(
  function MenuBar(props, ref) {
    const {
      onClick,
      onFocus,
      onKeyDown,
      horizontal = true,
      hoverTimeout,
      children,
      ...remaining
    } = props;
    const menuBarContext = useMenuBarProvider({
      root: true,
      menubar: true,
      hoverTimeout,
    });
    const { activeId, enableHoverMode } = menuBarContext;
    const { movementProps, movementContext } = useKeyboardMovementProvider({
      onClick,
      onFocus,
      onKeyDown,
      loopable: true,
      searchable: true,
      horizontal,
      includeDisabled: true,
      tabIndexBehavior: "roving",
      onFocusChange(event) {
        if (activeId) {
          enableHoverMode(event.element.id);
        }
      },
    });

    return (
      <KeyboardMovementProvider value={movementContext}>
        <MenuBarProvider value={menuBarContext}>
          <List
            {...remaining}
            {...movementProps}
            ref={ref}
            role="menubar"
            horizontal={horizontal}
          >
            {children}
          </List>
        </MenuBarProvider>
      </KeyboardMovementProvider>
    );
  }
);
