import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import {
  bem,
  useIsUserInteractionMode,
  useKeyboardFocus,
} from "@react-md/utils";
import cn from "classnames";

import type { TabsConfig } from "./types";
import { useTabIndicatorStyles } from "./useTabIndicatorStyles";

export interface TabsListProps
  extends HTMLAttributes<HTMLDivElement>,
    TabsConfig {
  /**
   * The current active tab index to determine which tabs to animate in and out
   * of view.
   */
  activeIndex: number;

  /**
   * A function to call when the `activeIndex` should change due to keyboard
   * movement or clicking on a tab.
   */
  onActiveIndexChange(activeIndex: number): void;

  /**
   * Boolean if the indicator transition should be disabled while the active tab
   * index changes.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;
}

const styles = bem("rmd-tabs");

/**
 * The `TabsList` component is the container for all the individual `Tab`s that
 * should be rendered. This handles adding an active indicator underneath the
 * active tab and animating it to the new location when a new tab becomes
 * active. It also handles the ability update which tab is selected when it has
 * been clicked or updated with keyboard movement.
 *
 * This should probably not be used outside of this package unless a custom
 * implementation is desired.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList(
    {
      style,
      className,
      onFocus,
      onKeyDown,
      children,
      activeIndex,
      align = "left",
      automatic = false,
      padded = false,
      orientation = "horizontal",
      onActiveIndexChange,
      disableTransition = false,
      ...props
    },
    ref
  ) {
    const horizontal = orientation === "horizontal";
    const isKeyboard = useIsUserInteractionMode("keyboard");
    const { focusIndex: _focusIndex, ...eventHandlers } = useKeyboardFocus({
      onFocus,
      onKeyDown,
      onFocusChange(element, focusIndex) {
        element.focus();
        if (automatic) {
          onActiveIndexChange(focusIndex);
        }
      },
    });

    const { refCallback, indicatorStyles } = useTabIndicatorStyles({
      ref,
      activeIndex,
    });

    return (
      <div
        {...props}
        aria-orientation={orientation}
        style={{ ...style, ...indicatorStyles }}
        role="tablist"
        ref={refCallback}
        className={cn(
          styles({
            [align]: true,
            padded,
            vertical: !horizontal,
            animate: !disableTransition && (!automatic || !isKeyboard),
          }),
          className
        )}
        {...eventHandlers}
      >
        {children}
      </div>
    );
  }
);
