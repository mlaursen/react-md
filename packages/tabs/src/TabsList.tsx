/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  Ref,
  useEffect,
  useRef,
} from "react";
import cn from "classnames";
import { applyRef, bem, useIsUserInteractionMode } from "@react-md/utils";

import { TabsConfig } from "./types";
import {
  UpdateIndicatorStylesProvider,
  useTabIndicatorStyle,
} from "./useTabIndicatorStyle";
import { useTabsMovement } from "./useTabsMovement";

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
   */
  disableTransition?: boolean;
}

const block = bem("rmd-tabs");

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
      onClick,
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
    forwardedRef
  ) {
    const horizontal = orientation === "horizontal";
    const { tabs, itemRefs, handleClick, handleKeyDown } = useTabsMovement({
      onClick,
      onKeyDown,
      children,
      horizontal,
      activeIndex,
      onActiveIndexChange,
      automatic,
    });
    const [mergedStyle, tabsRefHandler, tabsRef, updateIndicatorStyles] =
      useTabIndicatorStyle({
        style,
        ref: forwardedRef,
        align,
        itemRefs,
        totalTabs: tabs.length,
        activeIndex,
      });
    const isKeyboard = useIsUserInteractionMode("keyboard");

    const prevActiveIndex = useRef(activeIndex);
    useEffect(() => {
      const tabs = tabsRef.current;
      const tabRef = itemRefs[activeIndex] && itemRefs[activeIndex].current;
      const incrementing = prevActiveIndex.current < activeIndex;
      prevActiveIndex.current = activeIndex;
      if (!tabs || !tabRef) {
        return;
      }

      const currentX = tabs.scrollLeft + tabs.offsetWidth;
      const tabLeft = tabRef.offsetLeft;
      const tabWidth = tabRef.offsetWidth;
      if (incrementing && currentX < tabLeft + tabWidth) {
        tabs.scrollLeft = tabLeft - tabWidth;
      } else if (!incrementing && tabs.scrollLeft > tabLeft) {
        tabs.scrollLeft = tabLeft;
      }

      // don't want this to trigger on itemRefs or tabsRef changes since those
      // have a chance of updating each render.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    return (
      <UpdateIndicatorStylesProvider value={updateIndicatorStyles}>
        <div
          {...props}
          aria-orientation={orientation}
          style={mergedStyle}
          role="tablist"
          className={cn(
            block({
              [align]: true,
              padded,
              vertical: !horizontal,
              animate: !disableTransition && (!automatic || !isKeyboard),
            }),
            className
          )}
          ref={tabsRefHandler}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {Children.map(tabs, (child, i) => {
            if (!isValidElement(child)) {
              return child;
            }

            const tab = Children.only(child);
            let ref: Ref<HTMLElement> = itemRefs[i];
            if (tab.props.ref) {
              ref = (instance: HTMLElement | null) => {
                itemRefs[i].current = instance;
                applyRef(instance, tab.props.ref);
              };
            }

            return cloneElement(tab, { ref });
          })}
        </div>
      </UpdateIndicatorStylesProvider>
    );
  }
);

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  try {
    const PropTypes = require("prop-types");

    TabsList.propTypes = {
      style: PropTypes.object,
      className: PropTypes.string,
      children: PropTypes.node,
      onClick: PropTypes.func,
      onKeyDown: PropTypes.func,
      align: PropTypes.oneOf(["left", "center", "right"]),
      automatic: PropTypes.bool,
      padded: PropTypes.bool,
      orientation: PropTypes.oneOf(["horizontal", "vertical"]),
      activeIndex: PropTypes.number.isRequired,
      onActiveIndexChange: PropTypes.func.isRequired,
      disableTransition: PropTypes.bool,
    };
  } catch (e) {}
}
