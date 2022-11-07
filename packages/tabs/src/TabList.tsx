import type { UseStateSetter } from "@react-md/core";
import { bem, KeyboardMovementProvider, useAppSize } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { BaseTabListScrollButtonProps } from "./TabListScrollButton";
import { TabListScrollButton } from "./TabListScrollButton";
import { useTabList } from "./useTabList";

const styles = bem("rmd-tablist");

/**
 * The supported types of alignments for the tabs.
 */
export type TabsAlignment = "left" | "center" | "right";

export interface TabListClassNameOptions {
  className?: string;
  align?: TabsAlignment;
  padded?: boolean;
  vertical?: boolean;
  scrollbar?: boolean;
  disableTransition?: boolean;
}

export function tabList(options: TabListClassNameOptions = {}): string {
  const {
    className,
    align = "left",
    padded,
    vertical,
    scrollbar,
    disableTransition = false,
  } = options;

  return cnb(
    styles({
      [align]: true,
      padded,
      vertical,
      animate: !disableTransition,
      "no-scrollbar": !scrollbar,
    }),
    className
  );
}

export interface TabListProps
  extends HTMLAttributes<HTMLDivElement>,
    TabListClassNameOptions {
  activeIndex: number;
  setActiveIndex: UseStateSetter<number>;
  activationMode?: "manual" | "automatic";
  scrollButtons?: boolean | "allow-phone";
  forwardScrollButtonProps?: BaseTabListScrollButtonProps;
  backwardScrollButtonProps?: BaseTabListScrollButtonProps;
}

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

    return (
      <KeyboardMovementProvider value={movementContext}>
        <div
          {...remaining}
          {...elementProps}
          role="tablist"
          className={tabList({
            align,
            padded,
            vertical,
            scrollbar,
            disableTransition,
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
