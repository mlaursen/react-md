"use client";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { useAppSize } from "../media-queries/AppSizeProvider.js";
import { KeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import {
  TabListScrollButton,
  type BaseTabListScrollButtonProps,
} from "./TabListScrollButton.js";
import { tabList, type TabsAlignment } from "./tabListStyles.js";
import { useTabList } from "./useTabList.js";
import { type GetTabListScrollToOptions } from "./utils.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useTabs } from "./useTabs.js";

/**
 * @since 6.0.0
 */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  setActiveIndex(nextActiveIndex: number): void;

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
   * @defaultValue `false`
   */
  inline?: boolean;

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
 * @since 6.0.0
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
      inline = false,
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
        disableTransition,
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
            inline,
            animate: !disableTransition && animate,
            vertical,
            scrollbar,
            indicator: !disableTransition,
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
