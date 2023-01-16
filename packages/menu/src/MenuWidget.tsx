import type { GetDefaultFocusedIndex, NonNullMutableRef } from "@react-md/core";
import {
  KeyboardMovementProvider,
  useKeyboardMovementProvider,
} from "@react-md/core";
import { List } from "@react-md/list";
import type { HTMLAttributes } from "react";
import { forwardRef, useRef, useState } from "react";
import type { MenuListConvenienceProps } from "./Menu";
import {
  MenuBarProvider,
  useMenuBarContext,
  useMenuBarProvider,
} from "./useMenuBarProvider";

const noop = (): void => {
  // do nothing
};

const getNonDisabledOptions = (
  container: HTMLElement
): readonly HTMLElement[] => [
  ...container.querySelectorAll<HTMLLIElement>(
    '[role="option"]:not([aria-disabled])'
  ),
];

/**
 * @internal
 */
export interface MenuWidgetProps
  extends HTMLAttributes<HTMLDivElement>,
    MenuListConvenienceProps {
  isSheet: boolean;
  horizontal: boolean;
  cancelUnmountFocus: NonNullMutableRef<boolean>;
  getDefaultFocusedIndex?: GetDefaultFocusedIndex;
}

/**
 * This component was added to support the listbox role and the `useId()` hook.
 * If the `temporary` prop is set, the `MenuItem`'s ids will not be the same the
 * next time the menu opens, so the aria-activedescendant will point to a
 * non-existing id
 *
 * @internal
 */
export const MenuWidget = forwardRef<HTMLDivElement, MenuWidgetProps>(
  function MenuWidget(props, ref) {
    const {
      id,
      role = "menu",
      listStyle,
      listClassName,
      listProps,
      children,
      onClick,
      onBlur = noop,
      onFocus = noop,
      onKeyDown = noop,
      tabIndex = role === "listbox" ? 0 : -1,
      isSheet,
      horizontal,
      cancelUnmountFocus,
      getDefaultFocusedIndex,
      ...remaining
    } = props;
    const { menubar } = useMenuBarContext();

    // Since there is the possibility of other tab focusable elements within the
    // sheet and the menu items are programmatically focused, the menu's
    // tabIndex needs to be set to `-1` while one of the child menu items are
    // focused. This allows Shift+Tab correctly focuses the previous focusable
    // element within the sheet. Since `onFocus` and `onBlur` will be bubbled up
    // to the menu widget each time a new MenuItem is focused, only disable the
    // focused state if the blur event is fired without another focus event
    // within an animation frame.
    const [sheetMenuFocused, setSheetMenuFocused] = useState(false);
    const sheetBlurredFame = useRef(0);
    const menuBarContext = useMenuBarProvider({
      root: false,
      menubar,
      hoverTimeout: menubar ? 0 : undefined,
      defaultActiveId: id,
    });
    const { movementProps, movementContext } = useKeyboardMovementProvider({
      onClick,
      onFocus(event) {
        onFocus(event);

        if (!isSheet) {
          return;
        }

        window.cancelAnimationFrame(sheetBlurredFame.current);
        setSheetMenuFocused(true);
      },
      onKeyDown,
      horizontal,
      loopable: true,
      searchable: true,
      programmatic: true,
      includeDisabled: role !== "listbox",
      tabIndexBehavior: role === "listbox" ? "virtual" : undefined,
      getDefaultFocusedIndex,
      onFocusChange(event) {
        if (menuBarContext.activeId) {
          menuBarContext.enableHoverMode(event.element.id);
        }
      },
      getFocusableElements:
        role === "listbox" ? getNonDisabledOptions : undefined,
    });

    return (
      <KeyboardMovementProvider value={movementContext}>
        <MenuBarProvider value={menuBarContext}>
          <div
            aria-orientation={horizontal ? "horizontal" : undefined}
            {...remaining}
            {...movementProps}
            id={id}
            ref={ref}
            role={role}
            tabIndex={isSheet && !sheetMenuFocused ? 0 : tabIndex}
            onBlur={(event) => {
              onBlur(event);
              if (!isSheet) {
                return;
              }

              sheetBlurredFame.current = window.requestAnimationFrame(() => {
                setSheetMenuFocused(false);
              });
            }}
          >
            <List
              {...listProps}
              style={listStyle ?? listProps?.style}
              className={listClassName || listProps?.className}
              horizontal={horizontal}
              onClick={(event) => {
                listProps?.onClick?.(event);

                // this makes it so you can click on the menu/list without
                // closing the menu
                if (event.target === event.currentTarget) {
                  event.stopPropagation();
                }

                // This might be a test only workaround since clicking links move focus
                // somewhere else
                if (event.target instanceof HTMLElement) {
                  cancelUnmountFocus.current = event.currentTarget.contains(
                    event.target.closest("a")
                  );
                }
              }}
            >
              {children}
            </List>
          </div>
        </MenuBarProvider>
      </KeyboardMovementProvider>
    );
  }
);
