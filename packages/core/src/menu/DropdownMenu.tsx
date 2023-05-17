import type { ReactElement, ReactNode, RefObject } from "react";
import { useCallback, useRef, useState } from "react";
import { useUserInteractionMode } from "../interaction";
import { getLastFocusableIndex } from "../movement";
import { useEnsuredId } from "../useEnsuredId";
import type { MenuConvenienceProps, MenuListConvenienceProps } from "./Menu";
import { Menu } from "./Menu";
import type { MenuButtonProps } from "./MenuButton";
import { MenuButton } from "./MenuButton";
import type { MenuConfiguration } from "./MenuConfigurationProvider";
import { MenuConfigurationProvider } from "./MenuConfigurationProvider";
import type { MenuItemButtonProps } from "./MenuItemButton";
import { MenuItemButton } from "./MenuItemButton";
import type { MenuSheetConvenienceProps } from "./MenuSheet";
import { MenuVisibilityProvider } from "./MenuVisibilityProvider";
import { useMenuBarContext } from "./useMenuBarProvider";

export interface BaseDropdownMenuProps
  extends MenuConfiguration,
    MenuListConvenienceProps,
    MenuSheetConvenienceProps,
    MenuConvenienceProps {
  buttonChildren: ReactNode;
}

export interface DropdownMenuButtonProps
  extends MenuButtonProps,
    BaseDropdownMenuProps {}

export interface DropdownMenuItemButtonProps
  extends MenuItemButtonProps,
    BaseDropdownMenuProps {}

/**
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 Updated to use an `&` instead of `|` to allow autocompletion to
 * work better by default. It's up to the user to make sure they don't provide
 * incorrect props.
 */
export type DropdownMenuProps = DropdownMenuButtonProps &
  DropdownMenuItemButtonProps;

/**
 * @example
 * Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { DropdownMenu, MenuItem } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <DropdownMenu buttonChildren="Dropdown">
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
 * import { DropdownMenu, MenuItem } from "@react-md/core";
 *
 * function Example() {
 *   return (
 *     <DropdownMenu buttonChildren="Dropdown">
 *       <MenuItem onClick={() => console.log('Clicked Item 1')}>
 *         Item 1
 *       </MenuItem>
 *       <MenuItem onClick={() => console.log('Clicked Item 2')}>
 *         Item 2
 *       </MenuItem>
 *       <DropdownMenu buttonChildren="Nested Dropdown">
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
 * @remarks
 * \@since 5.0.0
 * \@since 6.0.0 Updated to use the latest menu API.
 */
export function DropdownMenu(props: DropdownMenuProps): ReactElement {
  const {
    id: propId,
    horizontal,
    sheetHeader,
    sheetFooter,
    renderAsSheet,
    sheetPosition,
    sheetVerticalSize,
    buttonChildren,
    iconRotatorProps: propIconRotatorProps,
    disableTransition: propDisableTransition,
    anchor,
    vwMargin,
    vhMargin,
    xMargin,
    yMargin,
    initialX,
    initialY,
    width,
    transformOrigin,
    preventOverlap,
    disableSwapping,
    disableVHBounds,
    preventScroll,
    closeOnResize,
    closeOnScroll,
    getFixedPositionOptions,
    children,
    temporary,
    disablePortal,
    disableElevation,
    menuProps,
    menuStyle,
    menuClassName,
    sheetProps,
    sheetStyle,
    sheetClassName,
    ...remaining
  } = props;

  const fixedTo = useRef<HTMLElement | HTMLButtonElement>(null);
  const defaultFocusIndex = useRef(0);
  const [visible, setVisible] = useState(false);
  const { menubar, menuitem, activeIdRef, animatedOnceRef } =
    useMenuBarContext();
  const id = useEnsuredId(propId, `menu${menuitem ? "item" : "button"}`);
  const mode = useUserInteractionMode();
  const mouse = mode === "mouse";
  const keyboard = mode === "keyboard";
  const disableTransition =
    propDisableTransition ??
    (animatedOnceRef.current &&
      menubar &&
      !!activeIdRef.current &&
      (mouse || keyboard));

  const onRequestClose = useCallback(() => {
    setVisible(false);
  }, []);

  let iconRotatorProps = propIconRotatorProps;
  if (disableTransition) {
    iconRotatorProps = {
      disableTransition,
      ...propIconRotatorProps,
    };
  }

  let toggle: ReactElement;
  if (menuitem) {
    toggle = (
      <MenuItemButton
        {...(remaining as DropdownMenuItemButtonProps)}
        id={id}
        ref={fixedTo as RefObject<HTMLLIElement>}
        iconRotatorProps={iconRotatorProps}
      >
        {buttonChildren}
      </MenuItemButton>
    );
  } else {
    toggle = (
      <MenuButton
        {...(remaining as DropdownMenuButtonProps)}
        id={id}
        ref={fixedTo as RefObject<HTMLButtonElement>}
        iconRotatorProps={iconRotatorProps}
      >
        {buttonChildren}
      </MenuButton>
    );
  }

  return (
    <MenuVisibilityProvider
      visible={visible}
      setVisible={setVisible}
      defaultFocusIndex={defaultFocusIndex}
    >
      <MenuConfigurationProvider
        horizontal={horizontal}
        renderAsSheet={renderAsSheet}
        sheetFooter={sheetFooter}
        sheetHeader={sheetHeader}
        sheetPosition={sheetPosition}
        sheetVerticalSize={sheetVerticalSize}
      >
        {toggle}
      </MenuConfigurationProvider>
      <Menu
        aria-labelledby={(menuProps?.["aria-label"] ? undefined : id) as string}
        style={menuStyle}
        className={menuClassName}
        sheetProps={sheetProps}
        sheetStyle={sheetStyle}
        sheetClassName={sheetClassName}
        temporary={temporary}
        disablePortal={disablePortal}
        disableElevation={disableElevation}
        disableTransition={disableTransition}
        anchor={anchor}
        vwMargin={vwMargin}
        vhMargin={vhMargin}
        xMargin={xMargin}
        yMargin={yMargin}
        initialX={initialX}
        initialY={initialY}
        width={width}
        transformOrigin={transformOrigin}
        preventOverlap={preventOverlap}
        disableSwapping={disableSwapping}
        disableVHBounds={disableVHBounds}
        preventScroll={preventScroll}
        closeOnResize={closeOnResize}
        closeOnScroll={closeOnScroll}
        getFixedPositionOptions={getFixedPositionOptions}
        horizontal={horizontal}
        sheetHeader={sheetHeader}
        sheetFooter={sheetFooter}
        renderAsSheet={renderAsSheet}
        sheetPosition={sheetPosition}
        sheetVerticalSize={sheetVerticalSize}
        {...menuProps}
        fixedTo={fixedTo}
        visible={visible}
        getDefaultFocusedIndex={(options) => {
          const defaultIndex = defaultFocusIndex.current;
          if (defaultIndex < 0) {
            return getLastFocusableIndex(options);
          }

          return defaultIndex;
        }}
        onRequestClose={onRequestClose}
        onEntered={(appearing) => {
          menuProps?.onEntered?.(appearing);
          // this will be called before `getDefaultFocusedIndex`
          if (disableTransition) {
            return;
          }

          defaultFocusIndex.current = 0;
        }}
      >
        {children}
      </Menu>
    </MenuVisibilityProvider>
  );
}
