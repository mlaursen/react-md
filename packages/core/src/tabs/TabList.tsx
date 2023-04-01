import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useAppSize } from "../AppSizeProvider";
import { KeyboardMovementProvider } from "../movement";
import type { UseStateSetter } from "../types";
import { bem } from "../utils";
import type { BaseTabListScrollButtonProps } from "./TabListScrollButton";
import { TabListScrollButton } from "./TabListScrollButton";
import { useTabList } from "./useTabList";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTabs } from "./useTabs";

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

  forwardScrollButtonProps?: BaseTabListScrollButtonProps;
  backwardScrollButtonProps?: BaseTabListScrollButtonProps;
}

/**
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
      }, 150);

      return () => {
        window.clearTimeout(timeout);
      };
    }, [activeIndex, disableTransition]);

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
              {...backwardScrollButtonProps}
              {...backwardProps}
            />
          )}
          {children}
          {showScrollButtons && (
            <TabListScrollButton
              {...forwardScrollButtonProps}
              {...forwardProps}
            />
          )}
        </div>
      </KeyboardMovementProvider>
    );
  }
);
