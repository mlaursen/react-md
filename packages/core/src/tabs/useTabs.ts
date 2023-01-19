import type { Ref, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SlideDirection } from "../transition";
import type { UseStateInitializer, UseStateSetter } from "../types";
import { useEnsuredId } from "../useEnsuredId";

const noop = (): void => {
  // do nothing
};

export interface TabsState {
  direction: SlideDirection;
  activeIndex: number;
}

export interface TabsHookOptions {
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

export interface ProvidedTabProps {
  "aria-controls": string | undefined;
  id: string;
  active: boolean;
}

export interface ProvidedTabListProps {
  activeIndex: number;
  setActiveIndex: UseStateSetter<number>;
}

export interface ProvidedTabPanelProps {
  "aria-labelledby": string;
  id: string;
  role: "tabpanel";
  active: boolean;
}

export interface ProvidedTabPanelsProps<E extends HTMLElement> {
  ref: Ref<E>;
  direction: SlideDirection;
}

export interface TabsHookReturnValue extends TabsState {
  setActiveIndex: UseStateSetter<number>;
  getTabProps(index: number): ProvidedTabProps;
  getTabListProps(): ProvidedTabListProps;
  getTabPanelProps(index: number): ProvidedTabPanelProps;
  getTabPanelsProps<E extends HTMLElement>(): ProvidedTabPanelsProps<E>;
}

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
