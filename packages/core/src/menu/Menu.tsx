"use client";

import { cnb } from "cnbuilder";
import {
  type CSSProperties,
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { type FloatingActionButtonPosition } from "../button/FloatingActionButton.js";
import { useFocusContainer } from "../focus/useFocusContainer.js";
import { useUserInteractionMode } from "../interaction/UserInteractionModeProvider.js";
import { type ListProps } from "../list/List.js";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import { type GetDefaultFocusedIndex } from "../movement/types.js";
import { Portal } from "../portal/Portal.js";
import { type CalculateFixedPositionOptions } from "../positioning/types.js";
import {
  type FixedPositioningOptions,
  useFixedPositioning,
} from "../positioning/useFixedPositioning.js";
import { useScrollLock } from "../scroll/useScrollLock.js";
import {
  type ScaleTransitionHookOptions,
  useScaleTransition,
} from "../transition/useScaleTransition.js";
import { type LabelRequiredForA11y, type PropsWithRef } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import {
  type MenuConfiguration,
  MenuConfigurationProvider,
  type MenuOrientationProps,
  useMenuConfiguration,
} from "./MenuConfigurationProvider.js";
import { MenuSheet, type MenuSheetConvenienceProps } from "./MenuSheet.js";
import { MenuWidget } from "./MenuWidget.js";
import { useMenuBarContext } from "./useMenuBarProvider.js";
import { getDefaultAnchor } from "./utils.js";

// NOTE: The augmentation is in this file since no types are imported from the
// `styles` file at this time
declare module "react" {
  interface CSSProperties {
    "--rmd-menu-background-color"?: string;
    "--rmd-menu-color"?: string;
    "--rmd-menu-min-width"?: string | number;
    "--rmd-menu-spacing"?: string | number;
  }
}

const noop = (): void => {
  // do nothing
};

/** @since 5.0.0 */
export type MenuTransitionProps = Omit<
  ScaleTransitionHookOptions<HTMLDivElement>,
  "transitionIn" | "vertical" | "nodeRef"
>;

/**
 * @since 6.0.0
 */
export interface MenuConfigurationProps extends CalculateFixedPositionOptions {
  /**
   * @see {@link ScaleTransitionHookOptions.temporary}
   * @defaultValue `true`
   */
  temporary?: boolean;

  /**
   * @defaultValue `false`
   */
  disablePortal?: boolean;

  /**
   * Boolean if the menu should not gain the elevation styles and should only be
   * set to `true` when rendering within a `Sheet`.
   *
   * @defaultValue `false`
   */
  disableElevation?: boolean;

  /**
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * @see {@link FixedPositioningOptions.transformOrigin}
   * @defaultValue `true`
   */
  transformOrigin?: boolean;

  /**
   * Boolean if the menu should close if the page is scrolled. The default
   * behavior is to just update the position of the menu relative to the menu
   * button until it can no longer be visible within the viewport.
   *
   * @defaultValue `false`
   */
  closeOnScroll?: boolean;

  /**
   * Boolean if the page should no longer be scrollable while the menu is
   * visible.
   *
   * @defaultValue `false`
   */
  preventScroll?: boolean;

  /**
   * Boolean if the menu should close instead of repositioning itself if the
   * browser window is resized.
   *
   * @defaultValue `false`
   */
  closeOnResize?: boolean;

  /** @see {@link FixedPositioningOptions.getFixedPositionOptions} */
  getFixedPositionOptions?: () => CalculateFixedPositionOptions;

  /**
   * @defaultValue `false`
   * @see {@link FixedPositioningOptions.disabled}
   */
  disableFixedPositioning?: boolean;
}

/**
 * @since 5.1.0
 * @since 6.0.0 Renamed from `MenuListProps` to `MenuListConvenienceProps`
 */
export interface MenuListConvenienceProps {
  /**
   * An optional style to provide to the `List` component that surrounds the
   * `MenuItem` within a `Menu`.
   */
  listStyle?: CSSProperties;

  /**
   * An optional className to provide to the `List` component that surrounds the
   * `MenuItem` within a `Menu`.
   */
  listClassName?: string;

  /**
   * Any additional props to pass to the `List` component that surrounds the
   * `Menu`'s `MenuItem`s.
   */
  listProps?: PropsWithRef<Omit<ListProps, "horizontal">>;
}

/**
 * @since 6.0.0
 */
export interface MenuConvenienceProps extends MenuConfigurationProps {
  /**
   * This can be used to apply additional props to the `Menu` component.
   *
   * Note: You can override the `style` and `className` using
   * {@link menuStyle} and {@link menuClassName} instead for convenience.
   *
   * @example
   * ```tsx
   * <DropdownMenu
   *   {...props}
   *   menuProps={{
   *     style: {
   *       // custom inline style
   *     },
   *     className: "come-class-name",
   *     getFixedPositionOptions: () => ({
   *       preventOverlap: true,
   *     }),
   *   }}
   * />
   * ```
   */
  menuProps?: PropsWithRef<
    Omit<
      MenuProps,
      | "children"
      | "fixedTo"
      | "visible"
      | "onRequestClose"
      | "getDefaultFocusedIndex"
    >
  >;

  /**
   * Convenience prop to apply custom style to the `Menu` component.
   */
  menuStyle?: CSSProperties;

  /**
   * Convenience prop to apply custom class name to the `Menu` component.
   */
  menuClassName?: string;
}

/**
 * @since 6.0.0
 */
export type MenuFixedPositioningOptions = Omit<
  FixedPositioningOptions<HTMLElement, HTMLDivElement>,
  "onScroll" | "onResize" | "nodeRef" | "disabled"
>;

/**
 * @since 5.0.0
 * @since 6.0.0 Updated to use the latest Menu, Transition, and Portal API.
 */
export interface MenuProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuConfiguration,
    MenuConfigurationProps,
    MenuFixedPositioningOptions,
    MenuOrientationProps,
    MenuTransitionProps,
    MenuListConvenienceProps,
    MenuSheetConvenienceProps {
  visible: boolean;
  onRequestClose: () => void;

  /**
   * @defaultValue `"menu-" + useId()`
   */
  id?: string;

  /**
   * This is used to set the default focus index when the menu is visible.
   *
   * @internal
   */
  getDefaultFocusedIndex?: GetDefaultFocusedIndex;

  /**
   * Custom style that should be applied to the menu only while not rendered
   * within a sheet since the {@link style} would be applied to both versions.
   */
  menuStyle?: CSSProperties;

  /**
   * Custom class name that should be applied only while not rendered within a
   * sheet.
   */
  menuClassName?: string;

  /**
   * @internal
   *
   * This is only used to update the default anchor when the DropdownMenu's
   * toggle is a floating action button.
   */
  floating?: FloatingActionButtonPosition;
}

/**
 * **Client Component**
 *
 * This component should generally only be used to implement context menus with
 * the `useContextMenu` hook. Otherwise, the `DropdownMenu` component should be
 * used.
 *
 * @see The `useContextMenu` hook for an example.
 *
 * @see {@link https://react-md.dev/components/menu | Menu Demos}
 * @since 5.0.0
 * @since 6.0.0 Updated this component to implement all the `Menu`
 * functionality instead of requiring the `useMenu` hook and `MenuWidget`
 * component. In addition, the `renderAsSheet` behavior has been moved into this
 * implementation so that the `MenuRenderer` is no longer required and context
 * menus can appear as a `Sheet`.
 */
export const Menu = forwardRef<HTMLDivElement, LabelRequiredForA11y<MenuProps>>(
  function Menu(props, propRef) {
    const {
      id: propId,
      style: propStyle,
      role = "menu",
      children,
      horizontal: _horizontal,
      sheetHeader: _sheetHeader,
      sheetFooter: _sheetFooter,
      renderAsSheet: _renderAsSheet,
      sheetPosition: _sheetPosition,
      sheetVerticalSize: _sheetVerticalSize,
      sheetProps,
      sheetStyle,
      sheetClassName,
      menuStyle,
      menuClassName,
      disableElevation = false,
      temporary = true,
      tabIndex = -1,
      fixedTo,
      className,
      classNames,
      timeout,
      appear,
      enter,
      exit,
      onEnter,
      onEntering = noop,
      onEntered = noop,
      onExit,
      onExiting,
      onExited = noop,
      onKeyDown = noop,
      listProps,
      listStyle,
      listClassName,
      visible,
      onRequestClose,
      floating,
      anchor,
      closeOnResize = false,
      closeOnScroll = false,
      preventScroll = false,
      vwMargin,
      vhMargin,
      xMargin,
      yMargin,
      width,
      transformOrigin = true,
      preventOverlap,
      disableSwapping,
      disableVHBounds,
      initialX,
      initialY,
      disableFixedPositioning,
      getFixedPositionOptions,
      disablePortal: propDisablePortal,
      disableTransition,
      ...remaining
    } = props;
    const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } =
      props;

    const id = useEnsuredId(propId, "menu");
    const {
      root,
      menubar,
      menuitem,
      activeId,
      animatedOnceRef,
      hoverTimeoutRef,
      disableHoverMode,
    } = useMenuBarContext();
    const {
      horizontal,
      sheetHeader,
      sheetFooter,
      renderAsSheet,
      sheetPosition,
      sheetVerticalSize,
    } = useMenuConfiguration(props);
    const { isPhone } = useAppSize();
    const isSheet =
      renderAsSheet === true || (renderAsSheet === "phone" && isPhone);

    const entered = useRef(false);
    const cancelUnmountFocus = useRef(false);
    const hideWithoutRefocus = (): void => {
      cancelUnmountFocus.current = true;
      onRequestClose();
    };
    const mode = useUserInteractionMode();
    const mouse = mode === "mouse";

    const { eventHandlers, transitionOptions } = useFocusContainer({
      nodeRef: propRef,
      activate: visible,
      onKeyDown(event) {
        onKeyDown(event);

        // when a menu is within a sheet, it should not trigger the custom
        // keyboard behavior
        if (isSheet) {
          return;
        }

        switch (event.key) {
          case "Escape":
            // prevent parent components that have an "Escape" keypress event
            // from being triggered as well
            event.stopPropagation();
            disableHoverMode();
            onRequestClose();
            break;
          case "Tab":
            // since menus are portalled, tab index is kinda broke so just close
            // the menu instead of doing default tab behavior
            event.preventDefault();

            if (!menuitem) {
              // pressing the tab key should still cascade close all menus
              event.stopPropagation();
            }
            disableHoverMode();
            onRequestClose();
            break;
          case "ArrowUp":
            if (!root && menuitem && horizontal) {
              event.stopPropagation();
              event.preventDefault();
              onRequestClose();
            }
            break;
          case "ArrowLeft":
            if (!root && menuitem && !horizontal) {
              event.stopPropagation();
              event.preventDefault();
              onRequestClose();
            }
            break;
        }
      },
      onEntering(appearing) {
        onEntering(appearing);
        entered.current = true;
      },
      onEntered(appearing) {
        onEntered(appearing);
        entered.current = true;
        cancelUnmountFocus.current = false;
        animatedOnceRef.current = true;
      },
      onExited() {
        onExited();
        entered.current = false;
      },
      onExiting,
      disableTransition,
      isFocusTypeDisabled(type) {
        if (role === "listbox") {
          return !isSheet;
        }

        if (type === "keyboard") {
          return isSheet;
        }

        const isHoverDisabled = mouse && hoverTimeoutRef.current === 0;
        if (type === "mount") {
          return isHoverDisabled;
        }

        return (
          isHoverDisabled ||
          cancelUnmountFocus.current ||
          (root && !!activeId && id !== activeId)
        );
      },
    });

    const { ref, style, callbacks, updateStyle } = useFixedPositioning({
      ...transitionOptions,
      disabled: disableFixedPositioning,
      onEnter,
      style: isSheet ? propStyle : menuStyle,
      fixedTo,
      anchor: getDefaultAnchor({
        anchor,
        menubar,
        floating,
        menuitem: !root && menuitem,
        horizontal,
      }),
      vwMargin,
      vhMargin,
      xMargin,
      yMargin,
      width,
      transformOrigin,
      preventOverlap,
      disableSwapping,
      disableVHBounds,
      initialX,
      initialY,
      getFixedPositionOptions,
      onResize: closeOnResize ? hideWithoutRefocus : undefined,
      onScroll(_event, data) {
        if (!data.visible || closeOnScroll) {
          hideWithoutRefocus();
        }
      },
    });
    const { rendered, disablePortal, elementProps } = useScaleTransition({
      nodeRef: ref,
      className: cnb(!isSheet && menuClassName, className),
      transitionIn: visible,
      vertical: !horizontal,
      temporary,
      timeout: isSheet || disableTransition ? 0 : timeout,
      classNames,
      appear,
      enter,
      exit,
      onExit,
      onExiting: transitionOptions.onExiting,
      exitedHidden: true,
      ...callbacks,
    });
    useScrollLock(visible && preventScroll);

    // need to make sure that the useEffect does not refire for hiding on click
    // events because of the `window.requestAnimationFrame`. It'll make it so
    // that menu items that update state are unable to close when clicked
    const hide = useRef(onRequestClose);
    useEffect(() => {
      hide.current = onRequestClose;
    });
    useEffect(() => {
      if (!visible) {
        return;
      }

      const callback = (event: globalThis.MouseEvent): void => {
        // this is required for when the transition is disabled
        if (!entered.current) {
          return;
        }

        // if the user clicks outside of the menu to close it, the toggle button
        // should not be focused. instead the nearest focusable element from the
        // click event should be focused when Tab or Shift + tab is pressed
        cancelUnmountFocus.current =
          !(event.target instanceof HTMLElement) ||
          !event.target.closest(`[role="${role}"]`);

        // this won't be called if `event.stopPropagation()` is called
        hide.current();
        disableHoverMode();
      };

      // wait an animation frame so the initial click event that caused the menu
      // to become visible does not immediately close the menu
      const frame = window.requestAnimationFrame(() => {
        window.addEventListener("click", callback);
      });

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("click", callback);
      };
    }, [disableHoverMode, role, visible]);
    useIsomorphicLayoutEffect(() => {
      if (!visible) {
        return;
      }

      updateStyle();
    }, [updateStyle, children, visible]);

    return (
      <MenuConfigurationProvider
        horizontal={horizontal}
        renderAsSheet={renderAsSheet}
        sheetFooter={sheetFooter}
        sheetHeader={sheetHeader}
        sheetPosition={sheetPosition}
        sheetVerticalSize={sheetVerticalSize}
      >
        <MenuSheet
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy as string}
          header={sheetHeader}
          footer={sheetFooter}
          position={sheetPosition}
          verticalSize={sheetVerticalSize}
          visible={visible}
          enabled={isSheet}
          onRequestClose={onRequestClose}
          style={sheetStyle}
          className={sheetClassName}
          disablePortal={propDisablePortal}
          temporary={temporary}
          disableTransition={disableTransition}
          {...sheetProps}
        >
          <Portal disabled={isSheet || (propDisablePortal ?? disablePortal)}>
            {(rendered || isSheet) && (
              <MenuWidget
                {...remaining}
                {...elementProps}
                {...eventHandlers}
                id={id}
                role={role}
                style={isSheet ? propStyle : style}
                isSheet={isSheet}
                tabIndex={tabIndex}
                horizontal={horizontal}
                listProps={listProps}
                listStyle={listStyle}
                listClassName={listClassName}
                disableElevation={disableElevation}
                cancelUnmountFocus={cancelUnmountFocus}
              >
                {children}
              </MenuWidget>
            )}
          </Portal>
        </MenuSheet>
      </MenuConfigurationProvider>
    );
  }
);
