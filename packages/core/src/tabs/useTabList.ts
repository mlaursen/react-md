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

import { useAppSize } from "../media-queries/AppSizeProvider.js";
import type {
  KeyboardMovementContext,
  KeyboardMovementProps,
} from "../movement/types.js";
import { useKeyboardMovementProvider } from "../movement/useKeyboardMovementProvider.js";
import { useDir } from "../typography/WritingDirectionProvider.js";
import { useEnsuredRef } from "../useEnsuredRef.js";
import { useResizeObserver } from "../useResizeObserver.js";
import {
  type TabListActivationMode,
  type TabListScrollButtonsBehavior,
} from "./types.js";
import { getTabRoleOnly, scrollTabIntoView } from "./utils.js";

const TAB_SIZE_VAR = "--rmd-tab-size";
const TAB_OFFSET_VAR = "--rmd-tab-offset";

const noop = (): void => {
  // do nothing
};

export type TabWidthVar = typeof TAB_SIZE_VAR;
export type TabOffsetVar = typeof TAB_OFFSET_VAR;

export type IndicatorCSSProperties = CSSProperties &
  Record<TabWidthVar | TabOffsetVar, string>;

export interface TabListHookOptions {
  ref: Ref<HTMLDivElement> | undefined;
  style: CSSProperties | undefined;
  activeIndex: number;
  setActiveIndex: (nextActiveIndex: number) => void;
  scrollButtons: TabListScrollButtonsBehavior;
  activationMode: TabListActivationMode;
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
    disableTransition?: boolean;
  };
  forwardProps: {
    ref: RefObject<HTMLDivElement>;
    type: "forward";
    vertical: boolean;
    disableTransition?: boolean;
  };
  showScrollButtons: boolean;
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
  const { isPhone } = useAppSize();
  const isScrollObserverEnabled =
    scrollButtons === "auto" ||
    (scrollButtons === "auto-tablet-or-above" && !isPhone);
  const [autoScrollButtons, setAutoScrollButtons] = useState(false);
  const showScrollButtons =
    scrollButtons === true ||
    (scrollButtons === "tablet-or-above" && !isPhone) ||
    (isScrollObserverEnabled && autoScrollButtons);

  const [indicatorStyles, setIndicatorStyles] =
    useState<IndicatorCSSProperties>(() => {
      const tabWidth = `${100 / 3}%`;
      return {
        [TAB_SIZE_VAR]: tabWidth,
        [TAB_OFFSET_VAR]: "0px",
      };
    });

  const [nodeRef, ref] = useEnsuredRef(propRef);
  const tabListRef = useResizeObserver({
    ref,
    disabled: disableTransition && !isScrollObserverEnabled,
    disableHeight: disableTransition && !isScrollObserverEnabled && !vertical,
    disableWidth: disableTransition && !isScrollObserverEnabled && vertical,
    onUpdate: useCallback(
      (entry) => {
        // this is kind of hacky -- the styles should update when switching
        // between RTL or when the scroll buttons appear, but they aren't
        // required for any styles. Just reference them so that the hooks
        // eslint rule doesn't show a warning...
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        isRTL;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        showScrollButtons;

        if (isScrollObserverEnabled && nodeRef.current) {
          setAutoScrollButtons(
            nodeRef.current.scrollWidth > nodeRef.current.offsetWidth
          );
        }

        const activeTab = getTabRoleOnly(entry.target)[activeIndex];
        if (!activeTab || disableTransition) {
          return;
        }

        const size = vertical ? activeTab.offsetHeight : activeTab.offsetWidth;
        const offset = vertical ? activeTab.offsetTop : activeTab.offsetLeft;
        const cssVars: IndicatorCSSProperties = {
          [TAB_SIZE_VAR]: `${size}px`,
          [TAB_OFFSET_VAR]: `${offset}px`,
        };

        setIndicatorStyles((prevStyles) => {
          if (
            prevStyles &&
            prevStyles[TAB_SIZE_VAR] === cssVars[TAB_SIZE_VAR] &&
            prevStyles[TAB_OFFSET_VAR] === cssVars[TAB_OFFSET_VAR]
          ) {
            return prevStyles;
          }

          return cssVars;
        });
      },
      [
        activeIndex,
        disableTransition,
        isRTL,
        isScrollObserverEnabled,
        nodeRef,
        showScrollButtons,
        vertical,
      ]
    ),
  });
  const forwardRef = useRef<HTMLDivElement>(null);
  const backwardRef = useRef<HTMLDivElement>(null);
  const { movementProps, movementContext } = useKeyboardMovementProvider({
    ref: tabListRef,
    onClick(event) {
      onClick(event);
      if (event.isPropagationStopped() || !(event.target instanceof Element)) {
        return;
      }

      const clickedTab = event.target.closest<HTMLElement>("[role='tab']");
      const tabs = getTabRoleOnly(event.currentTarget);
      const i = clickedTab ? tabs.indexOf(clickedTab) : -1;
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
      disableTransition,
    },
    forwardProps: {
      ref: forwardRef,
      type: "forward",
      vertical,
      disableTransition,
    },
    movementContext,
    showScrollButtons,
  };
}
