"use client";
import { forwardRef, useEffect } from "react";
import { useHoverMode } from "../hoverMode/useHoverMode.js";
import { useIcon } from "../icon/IconProvider.js";
import { IconRotator } from "../icon/IconRotator.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import { useEnsuredId } from "../useEnsuredId.js";
import type { BaseMenuButtonProps } from "./MenuButton.js";
import { useMenuConfiguration } from "./MenuConfigurationProvider.js";
import type { MenuItemProps } from "./MenuItem.js";
import { MenuItem } from "./MenuItem.js";
import { useMenuVisibility } from "./MenuVisibilityProvider.js";
import { useMenuBarContext } from "./useMenuBarProvider.js";

const noop = (): void => {
  // do nothing
};

/**
 * @internal
 * @remarks \@since 5.0.0
 */
export interface MenuItemButtonProps
  extends BaseMenuButtonProps,
    MenuItemProps {}

/**
 * **Client Component**
 *
 * This is just an internal component that handles rendering a submenu as a
 * menuitem for a `DropdownMenu` with a conditional dropdown icon.
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export const MenuItemButton = forwardRef<HTMLLIElement, MenuItemButtonProps>(
  function MenuItemButton(props, ref) {
    const {
      id: propId,
      children,
      onClick = noop,
      onKeyDown = noop,
      onMouseEnter = noop,
      onMouseLeave = noop,
      rightAddon: propRightAddon,
      iconRotatorProps,
      disableDropdownIcon = typeof propRightAddon !== "undefined",
      ...remaining
    } = props;
    const { disabled } = props;

    const id = useEnsuredId(propId, "menuitem");
    const mode = useUserInteractionMode();
    const { renderAsSheet } = useMenuConfiguration();
    const { isPhone } = useAppSize();
    const isSheet =
      renderAsSheet === true || (renderAsSheet === "phone" && isPhone);
    const {
      root,
      menubar,
      activeId,
      enableHoverMode,
      disableHoverMode,
      startDisableTimer,
      clearDisableTimer,
      leaveTimeoutRef,
      hoverTimeoutRef,
    } = useMenuBarContext();
    const { visible, setVisible, defaultFocusIndex } = useMenuVisibility();
    const { startShowFlow, clearVisibilityTimeout } = useHoverMode({
      setVisible,
      enableHoverMode,
      disableHoverMode,
      startDisableTimer,
      leaveTimeoutRef,
      hoverTimeoutRef,
      clearDisableTimer,
    });
    const { horizontal } = useMenuConfiguration();

    useEffect(() => {
      setVisible(id === activeId);
    }, [activeId, defaultFocusIndex, id, menubar, setVisible]);

    const dropdownIcon = useIcon(root ? "dropdown" : "forward");
    let rightAddon = propRightAddon;
    if (!disableDropdownIcon) {
      rightAddon = (
        <IconRotator {...iconRotatorProps} rotated={visible}>
          {dropdownIcon}
        </IconRotator>
      );
    }

    const updateVisibility = (nextVisible: boolean, focusIndex = 0): void => {
      defaultFocusIndex.current = focusIndex;
      setVisible(nextVisible);
      if (!menubar) {
        return;
      }

      if (nextVisible) {
        enableHoverMode(id);
      } else {
        disableHoverMode();
      }
    };

    return (
      <MenuItem
        {...remaining}
        aria-haspopup={isSheet ? "dialog" : "menu"}
        aria-expanded={visible || undefined}
        id={id}
        ref={ref}
        rightAddon={rightAddon}
        onClick={(event) => {
          onClick(event);

          event.stopPropagation();
          updateVisibility(!visible);
        }}
        onKeyDown={(event) => {
          onKeyDown(event);

          switch (event.key) {
            case "ArrowDown":
              if (horizontal || root) {
                event.preventDefault();
                event.stopPropagation();
                updateVisibility(true);
              }
              break;
            case "ArrowRight":
              if (!horizontal && !root) {
                event.preventDefault();
                event.stopPropagation();
                updateVisibility(true);
              }
              break;
          }
        }}
        onMouseEnter={(event) => {
          onMouseEnter(event);
          if (mode === "touch" || disabled || !menubar) {
            return;
          }

          defaultFocusIndex.current = 0;
          startShowFlow(id);
        }}
        onMouseLeave={(event) => {
          onMouseLeave(event);
          if (mode === "touch" || disabled || !menubar) {
            return;
          }

          clearVisibilityTimeout();
        }}
      >
        {children}
      </MenuItem>
    );
  }
);
