import {
  IconRotator,
  useEnsuredId,
  useHoverMode,
  useIcon,
  useUserInteractionMode,
} from "@react-md/core";
import { forwardRef, useEffect } from "react";
import type { BaseMenuButtonProps } from "./MenuButton";
import { useMenuConfiguration } from "./MenuConfigurationProvider";
import type { MenuItemProps } from "./MenuItem";
import { MenuItem } from "./MenuItem";
import { useMenuVisibility } from "./MenuVisibilityProvider";
import { useMenuBarContext } from "./useMenuBarProvider";

const noop = (): void => {
  // do nothing
};

export interface MenuItemButtonProps
  extends BaseMenuButtonProps,
    MenuItemProps {}

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
        aria-haspopup="menu"
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
