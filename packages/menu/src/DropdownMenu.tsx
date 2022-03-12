import type { ReactElement, RefObject } from "react";
import { useState } from "react";
import type { FABPosition } from "@react-md/button";
import { useUserInteractionMode } from "@react-md/utils";

import { useMenuBarContext } from "./MenuBarProvider";
import { MenuButton } from "./MenuButton";
import { useMenuConfiguration } from "./MenuConfigurationProvider";
import { MenuItemButton } from "./MenuItemButton";
import { MenuRenderer } from "./MenuRenderer";
import { MenuVisibilityProvider } from "./MenuVisibilityProvider";
import type {
  DropdownMenuButtonProps,
  DropdownMenuItemProps,
  DropdownMenuProps,
} from "./types";
import { useMenu } from "./useMenu";

/**
 * This component is a preset for creating dropdown menus using the
 * {@link useMenu} hook which provides the visibility behavior and other
 * functionality for menus. This will render as a `<Button>` by default but can
 * be rendered as a `<MenuItem>` by existing as a child of another
 * `DropdownMenu`.
 *
 * Most of the top-level props will be passed directly to the `Button` or
 * `MenuItem` components with the exception for the `children`. The children for
 * the `Button` or `MenuItem` can be set with the `buttonChildren` prop since
 * the main `children` should be the `Menu`'s children.
 *
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { DropdownMenu, MenuItem } from "@react-md/menu";
 *
 * function Example() {
 *   return (
 *     <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
 *       <MenuItem onClick={() => console.log('Clicked Item 1')}>
 *         Item 1
 *       </MenuItem>
 *       <MenuItem onClick={() => console.log('Clicked Item 2')}>
 *         Item 2
 *       </MenuItem>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @example
 * Nested Dropdown Menus
 * ```tsx
 * import type { ReactElement } from "react";
 * import { DropdownMenu, MenuItem } from "@react-md/menu";
 *
 * function Example() {
 *   return (
 *     <DropdownMenu id="example-dropdown-menu" buttonChildren="Dropdown">
 *       <MenuItem onClick={() => console.log('Clicked Item 1')}>
 *         Item 1
 *       </MenuItem>
 *       <MenuItem onClick={() => console.log('Clicked Item 2')}>
 *         Item 2
 *       </MenuItem>
 *       <DropdownMenu
 *         id="nested-dropdown-menu"
 *         buttonChildren="Nested Dropdown"
 *       >
 *         <MenuItem onClick={() => console.log('Clicked Item 1')}>
 *           Nested Item 1
 *         </MenuItem>
 *         <MenuItem onClick={() => console.log('Clicked Item 2')}>
 *           Nested Item 2
 *         </MenuItem>
 *       </DropdownMenu>
 *     </DropdownMenu>
 *   );
 * }
 * ```
 *
 * @remarks \@since 5.0.0
 */
export function DropdownMenu({
  id,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  menuLabel,
  menuProps: propMenuProps,
  menuStyle,
  menuClassName,
  sheetProps,
  sheetMenuProps,
  sheetStyle,
  sheetClassName,
  sheetHeader: propSheetHeader,
  sheetFooter: propSheetFooter,
  renderAsSheet: propRenderAsSheet,
  sheetPosition: propSheetPosition,
  sheetVerticalSize: propSheetVerticalSize,
  listStyle,
  listClassName,
  listProps,
  appear,
  enter,
  exit,
  timeout: propTimeout,
  classNames,
  anchor,
  fixedPositionOptions,
  getFixedPositionOptions,
  temporary,
  portal,
  portalInto,
  portalIntoId,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  horizontal: propHorizontal,
  children,
  preventScroll,
  closeOnResize,
  closeOnScroll,
  iconRotatorProps: propIconRotatorProps,
  disableFocusOnMount: propDisableFocusOnMount,
  disableFocusOnUnmount: propDisableFocusOnUnmount,
  ...props
}: DropdownMenuProps): ReactElement {
  const { disabled } = props;
  const {
    horizontal,
    sheetHeader,
    sheetFooter,
    renderAsSheet,
    sheetPosition,
    sheetVerticalSize,
  } = useMenuConfiguration({
    horizontal: propHorizontal,
    sheetFooter: propSheetFooter,
    sheetHeader: propSheetHeader,
    renderAsSheet: propRenderAsSheet,
    sheetPosition: propSheetPosition,
    sheetVerticalSize: propSheetVerticalSize,
  });

  const mode = useUserInteractionMode();
  const mouse = mode === "mouse";
  const keyboard = mode === "keyboard";
  const { root, menubar, menuitem, activeId, animatedOnce } =
    useMenuBarContext();

  const disableTransition =
    animatedOnce && menubar && !!activeId && (mouse || keyboard);
  const timeout = propTimeout ?? (disableTransition ? 0 : undefined);
  const disableFocusOnMount =
    propDisableFocusOnMount ?? (mouse && timeout === 0);
  const disableFocusOnUnmount =
    propDisableFocusOnUnmount ?? (mouse && timeout === 0);

  let iconRotatorProps = propIconRotatorProps;
  if (disableTransition) {
    iconRotatorProps = {
      animate: false,
      ...propIconRotatorProps,
    };
  }

  let floating: FABPosition = null;
  if (!menuitem) {
    ({ floating = null } = props as DropdownMenuButtonProps);
  }

  const [visible, setVisible] = useState(false);
  const { menuRef, menuProps, toggleRef, toggleProps } = useMenu<
    HTMLButtonElement | HTMLLIElement
  >({
    baseId: id,
    visible,
    setVisible,
    disabled,
    menuLabel,
    horizontal,
    onToggleClick: onClick,
    onToggleKeyDown: onKeyDown,
    onToggleMouseEnter: onMouseEnter,
    onToggleMouseLeave: onMouseLeave,
    onMenuClick: propMenuProps?.onClick,
    onMenuKeyDown: propMenuProps?.onKeyDown,
    floating,
    onEnter,
    onEntering,
    onEntered,
    onExited,
    anchor,
    style: menuStyle,
    fixedPositionOptions,
    getFixedPositionOptions,
    menuitem: !root && menuitem,
    preventScroll,
    closeOnResize,
    closeOnScroll,
    disableFocusOnMount,
    disableFocusOnUnmount,
  });

  let toggle: ReactElement;
  if (menuitem) {
    // see `DropdownMenuProps` about this typecast
    const { buttonChildren, ...itemProps } = props as DropdownMenuItemProps;
    toggle = (
      <MenuItemButton
        {...itemProps}
        iconRotatorProps={iconRotatorProps}
        {...toggleProps}
        ref={toggleRef as RefObject<HTMLLIElement>}
        visible={visible}
      >
        {buttonChildren}
      </MenuItemButton>
    );
  } else {
    // see `DropdownMenuProps` about this typecast
    const { buttonChildren, ...buttonProps } = props as DropdownMenuButtonProps;
    toggle = (
      <MenuButton
        {...buttonProps}
        iconRotatorProps={iconRotatorProps}
        {...toggleProps}
        ref={toggleRef as RefObject<HTMLButtonElement>}
        visible={visible}
      >
        {buttonChildren}
      </MenuButton>
    );
  }

  return (
    <MenuVisibilityProvider visible={visible} setVisible={setVisible}>
      {toggle}
      <MenuRenderer
        {...menuProps}
        menuRef={menuRef}
        menuProps={propMenuProps}
        menuStyle={menuProps.style}
        menuClassName={menuClassName}
        sheetProps={sheetProps}
        sheetStyle={sheetStyle}
        sheetClassName={sheetClassName}
        sheetMenuProps={sheetMenuProps}
        sheetHeader={sheetHeader}
        sheetFooter={sheetFooter}
        sheetPosition={sheetPosition}
        sheetVerticalSize={sheetVerticalSize}
        listStyle={listStyle}
        listClassName={listClassName}
        listProps={listProps}
        onRequestClose={() => setVisible(false)}
        horizontal={horizontal}
        renderAsSheet={renderAsSheet}
        temporary={temporary}
        portal={portal}
        portalInto={portalInto}
        portalIntoId={portalIntoId}
        appear={appear}
        enter={enter}
        exit={exit}
        onExit={onExit}
        onExiting={onExiting}
        timeout={timeout}
        classNames={classNames}
      >
        {children}
      </MenuRenderer>
    </MenuVisibilityProvider>
  );
}
