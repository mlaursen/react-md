"use client";

import {
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useRef,
} from "react";

import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { getLastFocusableIndex } from "../movement/utils.js";
import { type UseStateSetter } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredState } from "../useEnsuredState.js";
import {
  Menu,
  type MenuConvenienceProps,
  type MenuListConvenienceProps,
} from "./Menu.js";
import { MenuButton, type MenuButtonProps } from "./MenuButton.js";
import {
  type MenuConfiguration,
  MenuConfigurationProvider,
} from "./MenuConfigurationProvider.js";
import { MenuItemButton, type MenuItemButtonProps } from "./MenuItemButton.js";
import { type MenuSheetConvenienceProps } from "./MenuSheet.js";
import { MenuVisibilityProvider } from "./MenuVisibilityProvider.js";
import { useMenuBarContext } from "./useMenuBarProvider.js";

export interface BaseDropdownMenuProps
  extends
    MenuConfiguration,
    MenuListConvenienceProps,
    MenuSheetConvenienceProps,
    MenuConvenienceProps {
  buttonChildren: ReactNode;
}

export interface DropdownMenuButtonProps
  extends MenuButtonProps, BaseDropdownMenuProps {}

export interface DropdownMenuItemButtonProps
  extends MenuItemButtonProps, BaseDropdownMenuProps {}

/**
 * @since 6.0.0
 */
export interface DropdownMenuStateProps {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
}

/**
 * @since 5.0.0
 * @since 6.0.0 Updated to use an `&` instead of `|` to allow autocompletion to
 * work better by default. It's up to the user to make sure they don't provide
 * incorrect props.
 */
export type DropdownMenuProps = DropdownMenuButtonProps &
  DropdownMenuItemButtonProps &
  (DropdownMenuStateProps | { visible?: never; setVisible?: never });

/**
 * **Client Component**
 *
 * @example Simple Example
 * ```tsx
 * import type { ReactElement } from "react";
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItem } from "@react-md/core/menu/MenuItem";
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
 * @example Nested Dropdown Menus
 * ```tsx
 * import type { ReactElement } from "react";
 * import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
 * import { MenuItem } from "@react-md/core/menu/MenuItem";
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
 * @see {@link https://react-md.dev/components/menu | Menu Demos}
 * @since 5.0.0
 * @since 6.0.0 Updated to use the latest menu API.
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
    floating,
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
    visible: propVisible,
    setVisible: propSetVisible,
    ...remaining
  } = props;

  const fixedTo = useRef<HTMLElement | HTMLButtonElement>(null);
  const defaultFocusIndex = useRef(0);
  const [visible, setVisible] = useEnsuredState({
    name: "visible",
    value: propVisible,
    setValue: propSetVisible,
    defaultValue: false,
  });
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
  }, [setVisible]);

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
        ref={fixedTo as RefObject<HTMLLIElement | null>}
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
        ref={fixedTo as RefObject<HTMLButtonElement | null>}
        floating={floating}
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
        floating={floating}
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
