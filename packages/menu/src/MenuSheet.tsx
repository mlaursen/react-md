import type { HTMLAttributes, ReactElement, ReactNode, Ref } from "react";
import { useRef, useState } from "react";
import type { ListElement } from "@react-md/list";
import { List } from "@react-md/list";
import type { BaseSheetProps } from "@react-md/sheet";
import { Sheet } from "@react-md/sheet";
import type {
  KeyboardFocusHookOptions,
  LabelRequiredForA11y,
} from "@react-md/utils";
import { useOnUnmount } from "@react-md/utils";

import { MenuKeyboardFocusProvider } from "./MenuKeyboardFocusProvider";
import { MenuWidget } from "./MenuWidget";
import type { MenuListProps, MenuOrientationProps } from "./types";

/** @remarks \@since 5.0.0 */
export interface MenuSheetProps
  extends BaseSheetProps,
    KeyboardFocusHookOptions<HTMLDivElement>,
    MenuOrientationProps,
    MenuListProps {
  /** {@inheritDoc MenuConfiguration.sheetHeader} */
  header?: ReactNode;
  /** {@inheritDoc MenuConfiguration.sheetFooter} */
  footer?: ReactNode;

  /**
   * The `Menu`s children.
   */
  children: ReactNode;

  /**
   * This should be the `menuRef` returned by the `useMenu` hook so that the
   * menu can be focused on mount.
   */
  menuRef: Ref<HTMLDivElement>;

  /**
   * Any additional props that should be passed to the `Menu` component.
   */
  menuProps?: HTMLAttributes<HTMLDivElement>;
}

/**
 * Implements a `Menu` using the `Sheet` component that probably shouldn't
 * really be used externally.
 *
 * @remarks \@since 5.0.0
 * @internal
 */
export function MenuSheet({
  id,
  children,
  header,
  footer,
  horizontal,
  menuRef,
  menuProps,
  listStyle,
  listClassName,
  listProps,
  position = "bottom",
  verticalSize = "touch",
  onClick,
  overlayProps,
  onRequestClose,
  ...props
}: LabelRequiredForA11y<MenuSheetProps>): ReactElement {
  const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy } = props;
  const listRef = useRef<ListElement>(null);

  // Since there is the possibility of other tab focusable elements within the
  // sheet and the menu items are programmatically focused, the menu's tabIndex
  // needs to be set to `-1` while one of the child menu items are focused. This
  // allows Shift+Tab correctly focuses the previous focusable element within
  // the sheet. Since `onFocus` and `onBlur` will be bubbled up to the menu
  // widget each time a new MenuItem is focused, only disable the focused state
  // if the blur event is fired without another focus event within an animation
  // frame.
  const [focused, setFocused] = useState(false);
  const blurredFrame = useRef(0);
  useOnUnmount(() => {
    window.cancelAnimationFrame(blurredFrame.current);
  });

  return (
    <Sheet
      id={`${id}-sheet`}
      {...props}
      onRequestClose={onRequestClose}
      overlayProps={{
        ...overlayProps,
        onClick: (event) => {
          overlayProps?.onClick?.(event);

          // prevent closing parent menus if the overlay element is clicked.
          event.stopPropagation();
          onRequestClose();
        },
      }}
      position={position}
      verticalSize={verticalSize}
      onClick={(event) => {
        onClick?.(event);

        // Prevent closing parent sheet/menus if an element in the header or
        // footer is clicked
        if (
          !(event.target instanceof HTMLElement) ||
          !listRef.current?.contains(event.target)
        ) {
          event.stopPropagation();
        }
      }}
    >
      {header}
      <MenuKeyboardFocusProvider horizontal={horizontal}>
        <MenuWidget
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy as string}
          id={id}
          ref={menuRef}
          tabIndex={focused ? -1 : 0}
          {...menuProps}
          onFocus={(event) => {
            menuProps?.onFocus?.(event);
            window.cancelAnimationFrame(blurredFrame.current);
            setFocused(true);
          }}
          onBlur={(event) => {
            menuProps?.onBlur?.(event);
            blurredFrame.current = window.requestAnimationFrame(() => {
              setFocused(false);
            });
          }}
          onKeyDown={(event) => {
            // the tab keypress should use the sheet's behavior instead of
            // closing the menus
            if (event.key === "Tab") {
              return;
            }
            menuProps?.onKeyDown?.(event);
          }}
          disableElevation
        >
          <List
            {...listProps}
            style={listStyle ?? listProps?.style}
            className={listClassName ?? listProps?.className}
            ref={listRef}
            horizontal={horizontal}
            onClick={(event) => {
              listProps?.onClick?.(event);

              // this makes it so you can click on the menu/list without
              // closing the menu
              if (event.target === event.currentTarget) {
                event.stopPropagation();
              }
            }}
          >
            {children}
          </List>
        </MenuWidget>
      </MenuKeyboardFocusProvider>
      {footer}
    </Sheet>
  );
}
