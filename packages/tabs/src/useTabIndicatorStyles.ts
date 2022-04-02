import type { Ref, RefCallback } from "react";
import { useCallback, useState } from "react";
import {
  useDir,
  useIsomorphicLayoutEffect,
  useKeyboardFocusContext,
  useResizeObserver,
} from "@react-md/utils";

import { useTabs } from "./TabsManager";

const TAB_WIDTH_VAR = "--rmd-tab-width";
const TAB_OFFSET_VAR = "--rmd-tab-offset";

type TabWidthVar = typeof TAB_WIDTH_VAR;
type TabOffsetVar = typeof TAB_OFFSET_VAR;
type IndicatorStyles = Record<TabWidthVar | TabOffsetVar, string>;

export interface TabIndicatorStylesHookOptions {
  ref?: Ref<HTMLDivElement>;
  activeIndex: number;
}

export interface TabIndicatorStylesHookReturnValue {
  refCallback: RefCallback<HTMLDivElement>;
  indicatorStyles: IndicatorStyles;
}

export function useTabIndicatorStyles(
  options: TabIndicatorStylesHookOptions
): TabIndicatorStylesHookReturnValue {
  const { ref, activeIndex } = options;

  const isRTL = useDir().dir === "rtl";
  const { tabs } = useTabs();
  const { watching } = useKeyboardFocusContext();
  const [indicatorStyles, setIndicatorStyles] = useState<IndicatorStyles>(
    () => {
      const tabWidth = `${100 / tabs.length}%`;
      return {
        [TAB_WIDTH_VAR]: tabWidth,
        [TAB_OFFSET_VAR]: `calc(${activeIndex} * ${tabWidth})`,
      };
    }
  );
  const updateIndicatorStyles = useCallback(() => {
    // this is kind of hacky -- the styles should update when switching between
    // RTL, but the RTL state isn't required for any styles. Just reference it
    // so that the hooks eslint rule doesn't show a warning...
    isRTL;

    const current = watching.current[activeIndex]?.element;
    if (!current) {
      return;
    }

    const cssVars: IndicatorStyles = {
      [TAB_WIDTH_VAR]: `${current.offsetWidth}px`,
      [TAB_OFFSET_VAR]: `${current.offsetLeft}px`,
    };
    setIndicatorStyles((prevStyles) => {
      if (
        prevStyles[TAB_WIDTH_VAR] === cssVars[TAB_WIDTH_VAR] &&
        prevStyles[TAB_OFFSET_VAR] === cssVars[TAB_OFFSET_VAR]
      ) {
        return prevStyles;
      }

      return cssVars;
    });
  }, [activeIndex, watching, isRTL]);
  const [nodeRef, refCallback] = useResizeObserver(updateIndicatorStyles, {
    ref,
  });

  useIsomorphicLayoutEffect(() => {
    const activeTab = watching.current[activeIndex]?.element;
    const container = nodeRef.current;
    if (!activeTab || !container) {
      return;
    }

    // NOTE: This should probably be moved into the `scrollIntoView` util
    // whenever I do another major version update. This is the same code, just
    // using horizontal properties
    const { offsetLeft } = activeTab;
    const { scrollLeft } = container;
    const tabRight = offsetLeft + activeTab.offsetWidth;
    const containerRight = container.offsetWidth + scrollLeft;
    if (tabRight > containerRight) {
      container.scrollLeft = tabRight - container.offsetWidth;
    } else if (offsetLeft < scrollLeft) {
      container.scrollLeft = offsetLeft;
    }
  }, [activeIndex, isRTL, nodeRef, watching]);

  return {
    refCallback,
    indicatorStyles,
  };
}
