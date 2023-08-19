"use client";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useAppSize } from "../AppSizeProvider.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import type { UseStateSetter } from "../types.js";
import { bem } from "../utils/bem.js";
import type { BaseTabListScrollButtonProps } from "./TabListScrollButton.js";
import { TabListScrollButton } from "./TabListScrollButton.js";
import { useTabList } from "./useTabList.js";
import type { GetTabListScrollToOptions } from "./utils.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTabs } from "./useTabs.js";

const styles = bem("rmd-tablist");

/**
 * The supported types of alignments for the tabs.
 */
export type TabsAlignment = "left" | "center" | "right";

/**
 * @remarks \@since 6.0.0
 */
export interface TabListClassNameOptions {
  className?: string;
  align?: TabsAlignment;
  animate?: boolean;
  padded?: boolean;
  vertical?: boolean;
  scrollbar?: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export function tabList(options: TabListClassNameOptions = {}): string {
  const {
    className,
    align = "left",
    padded,
    vertical,
    scrollbar,
    animate = false,
  } = options;

  return cnb(
    styles({
      [align]: true,
      padded,
      vertical,
      animate,
      "no-scrollbar": !scrollbar,
    }),
    className
  );
}

/**
 * @remarks \@since 6.0.0
 */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  setActiveIndex: UseStateSetter<number>;

  /**
   * @defaultValue `"left"`
   */
  align?: TabsAlignment;

  /**
   * @defaultValue `false`
   */
  padded?: boolean;

  /**
   * @defaultValue `false`
   */
  vertical?: boolean;

  /**
   * Set this to `true` to show a scrollbar when the number of tabs cause
   * overflow.
   *
   * @see {@link scrollButtons}
   * @defaultValue `false`
   */
  scrollbar?: boolean;

  /**
   * Set this to `true` to disable the active tab indicator from animating
   * when a new tab is selected.
   *
   * @defaultValue `false`
   */
  disableTransition?: boolean;

  /**
   * This should be equal to the `$tabs-transition-duration` variable.
   *
   * @defaultValue `150`
   */
  transitionDuration?: number;

  /**
   * @defaultValue `"manual"`
   */
  activationMode?: "manual" | "automatic";

  /**
   * Set this to `true` to render buttons that can scroll forwards or backwards
   * within the tab list if there is overflow **on desktop**. If you want to
   * display the scroll buttons on mobile as well, set this to `"allow-phone"` .
   *
   * @defaultValue `false`
   */
  scrollButtons?: boolean | "allow-phone";

  /**
   * A convenience prop for the {@link BaseTabListScrollButtonProps.getScrollToOptions}
   * on {@link forwardScrollButtonProps} and {@link backwardScrollButtonProps}.
   */
  getScrollToOptions?: GetTabListScrollToOptions;

  /**
   * Any additional props that should be passed to the scroll forward button.
   *
   * @example
   * ```tsx
   * forwardScrollButtonProps={{
   *   "aria-label": "Scroll right",
   *   theme: "primary",
   *   themeType: "contained",
   *   className: styles.buttonContainer,
   *   buttonProps: {
   *     className: styles.button,
   *   }
   * }}
   * ```
   */
  forwardScrollButtonProps?: BaseTabListScrollButtonProps;

  /**
   * Any additional props that should be passed to the scroll backward button.
   *
   * @example
   * ```tsx
   * forwardScrollButtonProps={{
   *   "aria-label": "Scroll left",
   *   theme: "primary",
   *   themeType: "contained",
   *   className: styles.buttonContainer,
   *   buttonProps: {
   *     className: styles.button,
   *   }
   * }}
   * ```
   */
  backwardScrollButtonProps?: BaseTabListScrollButtonProps;
}

/**
 * **Client Component**
 *
 * @see {@link useTabs} for example usage.
 *
 * @remarks \@since 6.0.0
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  function TabList(props, ref) {
    const {
      style,
      onClick,
      onFocus,
      onKeyDown,
      className,
      children,
      activeIndex,
      setActiveIndex,
      activationMode = "manual",
      align = "left",
      padded = false,
      vertical = false,
      scrollbar = false,
      scrollButtons = false,
      disableTransition = false,
      transitionDuration = 150,
      getScrollToOptions,
      forwardScrollButtonProps,
      backwardScrollButtonProps,
      ...remaining
    } = props;

    const { isPhone } = useAppSize();
    const showScrollButtons =
      !!scrollButtons && (scrollButtons === "allow-phone" || !isPhone);

    const { elementProps, movementContext, backwardProps, forwardProps } =
      useTabList({
        ref,
        style,
        onClick,
        onFocus,
        onKeyDown,
        vertical,
        activeIndex,
        setActiveIndex,
        activationMode,
        scrollButtons: showScrollButtons,
      });

    const prevActiveIndex = useRef(activeIndex);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
      const isSameIndex = activeIndex === prevActiveIndex.current;
      prevActiveIndex.current = activeIndex;
      if (disableTransition || isSameIndex) {
        return;
      }

      setAnimate(true);
      const timeout = window.setTimeout(() => {
        setAnimate(false);
      }, transitionDuration);

      return () => {
        window.clearTimeout(timeout);
      };
    }, [activeIndex, disableTransition, transitionDuration]);

    return (
      <KeyboardMovementProvider value={movementContext}>
        <div
          {...remaining}
          {...elementProps}
          role="tablist"
          className={tabList({
            align,
            padded,
            animate: !disableTransition && animate,
            vertical,
            scrollbar,
            className,
          })}
        >
          {showScrollButtons && (
            <TabListScrollButton
              getScrollToOptions={getScrollToOptions}
              {...backwardScrollButtonProps}
              {...backwardProps}
            />
          )}
          {children}
          {showScrollButtons && (
            <TabListScrollButton
              getScrollToOptions={getScrollToOptions}
              {...forwardScrollButtonProps}
              {...forwardProps}
            />
          )}
        </div>
      </KeyboardMovementProvider>
    );
  }
);
