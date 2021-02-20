import React, {
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { TabConfig } from "./types";

export type InitializedTabConfig = TabConfig & Required<Pick<TabConfig, "id">>;

export interface TabsManagerContext {
  /**
   * This is an id prefix to use for all the child Tab, TabList, and TabPanel
   * components.
   *
   * @example
   * id behavior
   * ```
   * - `Tabs` -> id={id}
   * - `Tab` ->
   *    - id={`${id}-tab-${index + 1}`}
   *    - panelId={active && `${id}-panel-${index + 1}`}
   * - `TabPanel` -> id={`${id}-panel-${index + 1}`}
   * ```
   */
  tabsId: string;

  /**
   * The current active tab index to determine which tabs to animate in and out
   * of view.
   */
  activeIndex: number;

  /**
   * A function to call when the `activeIndex` should change due to keyboard
   * movement or clicking on a tab.
   */
  onActiveIndexChange: (activeIndex: number) => void;

  /**
   * The list of tabs that should be controlled by the tabs manager.
   */
  tabs: InitializedTabConfig[];
}

export type InitializedTabsManagerContext = Required<TabsManagerContext>;

const context = createContext<InitializedTabsManagerContext>({
  tabsId: "tabs",
  activeIndex: 0,
  onActiveIndexChange: () => {
    // do nothing
  },
  tabs: [],
});

/**
 * This hook returns the current "state" for the tabs which can be useful if you
 * need additional control or access to the tabs behavior.
 */
export function useTabs(): InitializedTabsManagerContext {
  return useContext(context);
}

const { Provider } = context;

export interface TabsManagerProps
  extends Omit<
    TabsManagerContext,
    "activeIndex" | "onActiveIndexChange" | "tabs"
  > {
  /**
   * The index of the tab that should be active by default. This is ignored if
   * the `activeIndex` prop is defined.
   */
  defaultActiveIndex?: number;

  /**
   * If you want to control the current active index instead of relying on the
   * built in behavior, you can provide an `activeIndex` prop which will be used
   * instead.  If this prop is defined, you **must** also provide the
   * `onActiveIndexChange` so that keyboard functionality and tab changing
   * behavior can still be used.
   */
  activeIndex?: number;

  /**
   * An optional function to call when the active index changes when the
   * `activeIndex` prop is not provided. If the `activeIndex` prop is provided,
   * this is **required** for keyboard accessibility.
   */
  onActiveIndexChange?: TabsManagerContext["onActiveIndexChange"];

  /**
   * The list of tabs that should be controlled by the tabs manager.
   */
  tabs: (TabConfig | ReactElement | string)[];

  /**
   * The children to render that should eventually have the `Tabs` component and
   * the `TabContent` for matching specific tabs.
   */
  children: ReactNode;

  /**
   * Boolean if all the `tabs` that have icons should be stacked instead of
   * rendered inline.
   *
   * This is mostly a convenience prop so that you don't manually need to enable
   * it for each tab in the `tabs` list and if a `tab` in the `tabs` list has
   * the `stacked` attribute enabled defined, it will be used instead of this
   * value.
   */
  stacked?: boolean;

  /**
   * Boolean if the icon should appear after the text instead of before for all
   * the `tabs` that have an icon. When the `stacked` prop is also enabled, it
   * will cause the icon to appear below the text instead of above.
   *
   * This is mostly a convenience prop so that you don't manually need to enable
   * it for each tab in the `tabs` list and if a `tab` in the `tabs` list has
   * the `stacked` attribute enabled defined, it will be used instead of this
   * value.
   */
  iconAfter?: boolean;
}

/**
 * The `TabsManager` is used to configure your `Tabs` component and handle some
 * of the default behavior such as:
 *
 * - controlling the `activeIndex`
 * - general tab configuration
 * - callbacks when the tab has changed
 * - providing an `id` prefix for all tabs for simplicity
 */
export function TabsManager({
  tabsId,
  defaultActiveIndex = 0,
  activeIndex: propActiveIndex,
  onActiveIndexChange,
  tabs,
  stacked = false,
  iconAfter = false,
  children,
}: TabsManagerProps): ReactElement {
  const [localActiveIndex, setActiveIndex] = useState(defaultActiveIndex);
  const handleActiveIndexChange = useCallback(
    (activeIndex: number) => {
      if (onActiveIndexChange) {
        onActiveIndexChange(activeIndex);
      }

      setActiveIndex(activeIndex);
    },
    [onActiveIndexChange]
  );

  const activeIndex =
    typeof propActiveIndex === "number" ? propActiveIndex : localActiveIndex;
  const updateActiveIndex =
    typeof propActiveIndex === "number"
      ? (onActiveIndexChange as TabsManagerContext["onActiveIndexChange"])
      : handleActiveIndexChange;

  const value = useMemo(
    () => ({
      activeIndex,
      onActiveIndexChange: updateActiveIndex,
      tabs: tabs.map((config, i) => {
        let tab: TabConfig;
        if (typeof config === "string" || isValidElement(config)) {
          tab = { children: config };
        } else {
          tab = config;
        }

        return {
          ...tab,
          id: tab.id || `${tabsId}-tab-${i + 1}`,
          panelId:
            activeIndex === i
              ? `${tabsId}-panel-${activeIndex + 1}`
              : undefined,
          stacked: typeof tab.stacked === "boolean" ? tab.stacked : stacked,
          iconAfter:
            typeof tab.iconAfter === "boolean" ? tab.iconAfter : iconAfter,
        };
      }),
      tabsId,
    }),
    [activeIndex, iconAfter, stacked, tabs, tabsId, updateActiveIndex]
  );

  return <Provider value={value}>{children}</Provider>;
}
