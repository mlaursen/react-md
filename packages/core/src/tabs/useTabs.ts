"use client";
import type { Ref, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SlideDirection } from "../transition";
import type { UseStateInitializer, UseStateSetter } from "../types";
import { useEnsuredId } from "../useEnsuredId";

const noop = (): void => {
  // do nothing
};

/**
 * @remarks \@since 6.0.0
 */
export interface TabsState {
  direction: SlideDirection;
  activeIndex: number;
}

/**
 * @remarks \@since 6.0.0
 */
export interface TabsHookOptions {
  /**
   * This can be used to generate the ids for the different components within
   * the tab widget.
   *
   * @defaultValue `"tab-" + useId()`
   */
  baseId?: string;

  /**
   * Use this callback trigger an effect whenever the `activeIndex` changes.
   * This should **not** be used to manually set the `activeIndex` in state
   * yourself.
   *
   * @example
   * Main Example
   * ```tsx
   * const { elementProps, transitionTo } = useCrossFadeTransition();
   * const { activeIndex, getTabProps, getTabListProps } = useTabs({
   *   onActiveIndexChange() {
   *     transitionTo("enter");
   *   },
   * });
   * ```
   *
   * @defaultValue `() => {}`
   */
  onActiveIndexChange?(activeIndex: number): void;

  /**
   * @defaultValue `false`
   */
  disableScrollFix?: boolean;

  /**
   * @defaultValue `0`
   */
  defaultActiveIndex?: UseStateInitializer<number>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ProvidedTabProps {
  "aria-controls": string | undefined;
  id: string;
  active: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ProvidedTabListProps {
  activeIndex: number;
  setActiveIndex: UseStateSetter<number>;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ProvidedTabPanelProps {
  "aria-labelledby": string;
  id: string;
  role: "tabpanel";
  active: boolean;
}

/**
 * @remarks \@since 6.0.0
 */
export interface ProvidedTabPanelsProps<E extends HTMLElement> {
  ref: Ref<E>;
  direction: SlideDirection;
}

/**
 * @remarks \@since 6.0.0
 */
export interface TabsHookReturnValue extends TabsState {
  setActiveIndex: UseStateSetter<number>;
  getTabProps(index: number): ProvidedTabProps;
  getTabListProps(): ProvidedTabListProps;
  getTabPanelProps(index: number): ProvidedTabPanelProps;
  getTabPanelsProps<E extends HTMLElement>(): ProvidedTabPanelsProps<E>;
}

/**
 * @example
 * Simple Example
 * ```tsx
 * import { Slide, SlideContainer, Tab, TabList, useTabs } from "@react-md/core";
 * import type { ReactElement } from "react";
 *
 * export function Example(): ReactElement {
 *   const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
 *     useTabs();
 *
 *   return (
 *     <>
 *       <TabList {...getTabListProps()}>
 *         <Tab {...getTabProps(0)}>Tab 1</Tab>
 *         <Tab {...getTabProps(1)}>Tab 2</Tab>
 *         <Tab {...getTabProps(2)}>Tab 3</Tab>
 *       </TabList>
 *       <SlideContainer {...getTabPanelsProps()}>
 *         <Slide {...getTabPanelProps(0)}>Tab 1 Content</Slide>
 *         <Slide {...getTabPanelProps(1)}>Tab 2 Content</Slide>
 *         <Slide {...getTabPanelProps(2)}>Tab 3 Content</Slide>
 *       </SlideContainer>
 *     </>
 *   );
 * }
 * ```
 *
 * @remarks \@since 6.0.0
 */
export function useTabs(options: TabsHookOptions = {}): TabsHookReturnValue {
  const {
    baseId: propBaseId,
    onActiveIndexChange = noop,
    disableScrollFix = false,
    defaultActiveIndex = 0,
  } = options;
  const baseId = useEnsuredId(propBaseId, "tab");

  const [state, setState] = useState<TabsState>(() => {
    const activeIndex =
      typeof defaultActiveIndex === "function"
        ? defaultActiveIndex()
        : defaultActiveIndex;

    return {
      direction: "left",
      activeIndex,
    };
  });
  const { direction, activeIndex } = state;
  const tabPanelsRef = useRef<HTMLElement>(null);

  const getTabId = (index: number): string => `${baseId}-${index + 1}`;
  const getTabPanelId = (index: number): string =>
    `${baseId}-panel-${index + 1}`;
  const setActiveIndex = useCallback<UseStateSetter<number>>(
    (indexOrFunction) => {
      setState(({ activeIndex }) => {
        const nextActiveIndex =
          typeof indexOrFunction === "function"
            ? indexOrFunction(activeIndex)
            : indexOrFunction;

        if (nextActiveIndex !== activeIndex) {
          onActiveIndexChange(nextActiveIndex);
        }

        return {
          direction: activeIndex < nextActiveIndex ? "left" : "right",
          activeIndex: nextActiveIndex,
        };
      });
    },
    [onActiveIndexChange]
  );
  useEffect(() => {
    const container = tabPanelsRef.current;
    if (!container || disableScrollFix) {
      return;
    }

    container.scrollTop = 0;
  }, [disableScrollFix, activeIndex]);

  return {
    ...state,
    setActiveIndex,
    getTabProps(index) {
      return {
        "aria-controls": getTabPanelId(index),
        id: getTabId(index),
        active: index === activeIndex,
      };
    },
    getTabListProps() {
      return {
        activeIndex,
        setActiveIndex,
      };
    },
    getTabPanelProps(index) {
      return {
        "aria-labelledby": getTabId(index),
        id: getTabPanelId(index),
        role: "tabpanel",
        active: index === activeIndex,
      };
    },
    getTabPanelsProps<E>() {
      return {
        ref: tabPanelsRef as RefObject<E>,
        direction,
      };
    },
  };
}
