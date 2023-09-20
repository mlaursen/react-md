"use client";
import type {
  CSSProperties,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
  RefObject,
} from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  KeyboardMovementContext,
  KeyboardMovementProps,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { useDir } from "../typography/WritingDirection.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useResizeObserver } from "../useResizeObserver.js";
import { getTabRoleOnly, scrollTabIntoView } from "./utils.js";

declare module "react" {
  interface CSSProperties {
    "--rmd-tab-width"?: string;
    "--rmd-tab-offset"?: string | number;
    "--rmd-tab-indicator-background"?: string;
  }
}

const TAB_WIDTH_VAR = "--rmd-tab-width";
const TAB_OFFSET_VAR = "--rmd-tab-offset";

const noop = (): void => {
  // do nothing
};

export type TabWidthVar = typeof TAB_WIDTH_VAR;
export type TabOffsetVar = typeof TAB_OFFSET_VAR;

export type IndicatorCSSProperties = CSSProperties &
  Record<TabWidthVar | TabOffsetVar, string>;

export interface TabListHookOptions {
  ref: Ref<HTMLDivElement> | undefined;
  style: CSSProperties | undefined;
  activeIndex: number;
  setActiveIndex(nextActiveIndex: number): void;
  scrollButtons: boolean;
  activationMode: "manual" | "automatic";
  vertical: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  onFocus: FocusEventHandler<HTMLDivElement> | undefined;
  onKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined;
  disableTransition: boolean;
}

export interface TabListHookReturnValue {
  elementProps: KeyboardMovementProps<HTMLDivElement> & {
    "aria-orientation": "horizontal" | "vertical";
    style: CSSProperties;
    ref: Ref<HTMLDivElement>;
    onClick: MouseEventHandler<HTMLDivElement>;
  };
  movementContext: KeyboardMovementContext;
  backwardProps: {
    ref: RefObject<HTMLDivElement>;
    type: "back";
    vertical: boolean;
  };
  forwardProps: {
    ref: RefObject<HTMLDivElement>;
    type: "forward";
    vertical: boolean;
  };
}

/**
 * @internal
 */
export function useTabList(
  options: TabListHookOptions
): TabListHookReturnValue {
  const {
    ref: propRef,
    style,
    activeIndex,
    scrollButtons,
    onClick = noop,
    onFocus,
    onKeyDown,
    activationMode,
    vertical,
    setActiveIndex,
    disableTransition,
  } = options;

  const isRTL = useDir().dir === "rtl";

  const [indicatorStyles, setIndicatorStyles] =
    useState<IndicatorCSSProperties>(() => {
      const tabWidth = `${100 / 3}%`;
      return {
        [TAB_WIDTH_VAR]: tabWidth,
        [TAB_OFFSET_VAR]: "0px",
      };
    });

  const [nodeRef, ref] = useEnsuredRef(propRef);
  const tabListRef = useResizeObserver({
    ref,
    disabled: disableTransition,
    onUpdate: useCallback(
      (entry) => {
        // this is kind of hacky -- the styles should update when switching between
        // RTL, but the RTL state isn't required for any styles. Just reference it
        // so that the hooks eslint rule doesn't show a warning...
        isRTL;

        const activeTab = getTabRoleOnly(entry.target)[activeIndex];
        if (!activeTab) {
          return;
        }

        const cssVars: IndicatorCSSProperties = {
          [TAB_WIDTH_VAR]: `${activeTab.offsetWidth}px`,
          [TAB_OFFSET_VAR]: `${activeTab.offsetLeft}px`,
        };

        setIndicatorStyles((prevStyles) => {
          if (
            prevStyles &&
            prevStyles[TAB_WIDTH_VAR] === cssVars[TAB_WIDTH_VAR] &&
            prevStyles[TAB_OFFSET_VAR] === cssVars[TAB_OFFSET_VAR]
          ) {
            return prevStyles;
          }

          return cssVars;
        });
      },
      [activeIndex, isRTL]
    ),
  });
  const forwardRef = useRef<HTMLDivElement>(null);
  const backwardRef = useRef<HTMLDivElement>(null);
  const { movementProps, movementContext } = useKeyboardMovementProvider({
    onClick(event) {
      onClick(event);
      if (event.isPropagationStopped() || !(event.target instanceof Element)) {
        return;
      }

      const clickedTab = event.target.closest("[role='tab']");
      const tabs = getTabRoleOnly(event.currentTarget);
      const i = tabs.findIndex((tab) => tab === clickedTab);
      if (i !== -1) {
        setActiveIndex(i);
      }
    },
    onFocus,
    onKeyDown,
    onFocusChange(event) {
      const { index } = event;
      if (activationMode === "automatic") {
        setActiveIndex(index);
      } else if (scrollButtons) {
        scrollTabIntoView({
          activeIndex: index,
          backward: backwardRef.current,
          container: nodeRef.current,
          forward: forwardRef.current,
          vertical,
        });
      }
    },
    loopable: true,
    searchable: true,
    horizontal: !vertical,
    includeDisabled: true,
    tabIndexBehavior: "roving",
    getFocusableElements: getTabRoleOnly,
  });

  useEffect(() => {
    scrollTabIntoView({
      activeIndex,
      backward: backwardRef.current,
      container: nodeRef.current,
      forward: forwardRef.current,
      vertical,
    });
  }, [activeIndex, nodeRef, vertical]);

  return {
    elementProps: {
      "aria-orientation": vertical ? "vertical" : "horizontal",
      ref: tabListRef,
      style: {
        ...style,
        ...(disableTransition ? undefined : indicatorStyles),
      },
      ...movementProps,
    },
    backwardProps: {
      ref: backwardRef,
      type: "back",
      vertical,
    },
    forwardProps: {
      ref: forwardRef,
      type: "forward",
      vertical,
    },
    movementContext,
  };
}
