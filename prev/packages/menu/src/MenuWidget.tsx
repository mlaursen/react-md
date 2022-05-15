import { forwardRef } from "react";
import cn from "classnames";
import type { LabelRequiredForA11y } from "@react-md/utils";
import { bem, useKeyboardFocus } from "@react-md/utils";

import { MenuBarProvider } from "./MenuBarProvider";
import type { MenuWidgetProps } from "./types";

const styles = bem("rmd-menu");

/**
 * This component implements the custom keyboard movement for a
 * [menu widget](https://www.w3.org/TR/wai-aria-practices/#menubutton). The
 * {@link MenuKeyboardFocusProvider} must be a parent component for this custom
 * focus behavior to work.
 *
 * Note: This is probably an internal only component since the {@link Menu} has
 * more functionality and includes this component.
 *
 * @internal
 * @remarks \@since 5.0.0
 */
export const MenuWidget = forwardRef<
  HTMLDivElement,
  LabelRequiredForA11y<MenuWidgetProps>
>(function MenuWidget(
  {
    children,
    onFocus: propOnFocus,
    onKeyDown: propOnKeyDown,
    tabIndex = -1,
    horizontal = false,
    className,
    getDefaultFocusIndex,
    onSearch,
    onIncrement,
    onDecrement,
    onJumpToLast,
    onJumpToFirst,
    disableElevation = false,
    ...props
  },
  ref
) {
  const { onFocus, onKeyDown } = useKeyboardFocus({
    onFocus: propOnFocus,
    onKeyDown: propOnKeyDown,
    getDefaultFocusIndex,
    onSearch,
    onIncrement,
    onDecrement,
    onJumpToLast,
    onJumpToFirst,
  });

  return (
    <MenuBarProvider root={false} defaultActiveId={props.id}>
      <div
        aria-orientation={horizontal ? "horizontal" : undefined}
        {...props}
        ref={ref}
        role="menu"
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        className={cn(
          styles({ horizontal, elevated: !disableElevation }),
          className
        )}
      >
        {children}
      </div>
    </MenuBarProvider>
  );
});
