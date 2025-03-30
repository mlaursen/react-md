"use client";

import { type Dispatch, type Ref, useEffect, useRef, useState } from "react";

import { type SlideDirection } from "../transition/SlideContainer.js";
import { type UseStateInitializer, type UseStateSetter } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { useEnsuredState } from "../useEnsuredState.js";
import { applyRef } from "../utils/applyRef.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type TabProps } from "./Tab.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type TabListProps } from "./TabList.js";

const EMPTY_LIST = [] as const;
const PANEL_PREFIX = "panel-";

/**
 * @since 6.0.0
 */
export interface TabsHookOptions<TabValue extends string | number = number> {
  /**
   * This can be used to generate the ids for the different components within
   * the tab widget.
   *
   * @defaultValue `"tab-" + useId()`
   */
  baseId?: string;

  /**
   * Set this to an **ordered** list of tab values when:
   * - using a `string` tab value
   * - using a `number` tab value does not represent a tab index
   *
   * See the examples on the {@link useTabs} for usage.
   */
  tabs?: readonly TabValue[];

  /**
   * Provide this value and {@link setActiveTab} to control the active tab
   * behavior.
   */
  activeTab?: TabValue;

  /** @see {@link activeTab} */
  setActiveTab?: Dispatch<TabValue>;

  /**
   * Set this to the default tab index when not controlling the active tab value
   * through {@link activeTab} and {@link setActiveTab}.
   *
   * @defaultValue `0`
   */
  defaultActiveTab?: UseStateInitializer<TabValue>;

  /** Convenience pass-through prop to {@link TabProps.stacked} */
  stacked?: boolean;
  /** Convenience pass-through prop to {@link TabProps.iconAfter} */
  iconAfter?: boolean;

  /** Convenience pass-through props to {@link TabListProps.vertical} */
  vertical?: boolean;

  /**
   * Set this to `true` if changing active tabs should no longer attempt to
   * scroll to the top of the tab panels container when using the
   * {@link TabsImplementation.getTabPanelsProps}.
   *
   * @defaultValue `false`
   */
  disableScrollFix?: boolean;

  /**
   * Convenience prop to disable all transitions for the
   * {@link TabsImplementation.getTabProps} and
   * {@link TabsImplementation.getTabListProps}.
   */
  disableTransition?: boolean;
}

/**
 * @since 6.0.0
 */
export interface ProvidedTabProps {
  "aria-controls": string;
  id: string;
  active: boolean;

  /** Convenience pass-through prop from {@link TabsHookOptions.stacked} */
  stacked?: boolean;
  /** Convenience pass-through prop from {@link TabsHookOptions.iconAfter} */
  iconAfter?: boolean;
  /** Convenience pass-through prop from {@link TabsHookOptions.disableTransition} */
  activeIndicator?: boolean;
  /** Convenience pass-through prop from {@link TabsHookOptions.vertical} and {@link TabsHookOptions.disableTransition} */
  verticalActiveIndicator?: boolean;
}

/**
 * @since 6.0.0
 */
export interface ProvidedTabListProps {
  activeIndex: number;
  setActiveIndex: Dispatch<number>;
  vertical?: boolean;
  disableTransition?: boolean;
}

/**
 * @since 6.0.0
 */
export interface ProvidedTabPanelProps {
  "aria-labelledby": string;
  id: string;
  role: "tabpanel";
  active: boolean;
}

/**
 * @since 6.0.0
 */
export interface ProvidedTabPanelsProps<E extends HTMLElement> {
  ref: Ref<E>;
  direction: SlideDirection;
}

/**
 * @since 6.0.0
 */
export interface TabsImplementation<TabValue extends string | number = number> {
  direction: SlideDirection;
  setDirection: UseStateSetter<SlideDirection>;
  activeTab?: TabValue;
  setActiveTab?: (nextActiveTab: TabValue) => void;
  getTabProps: (tabValue: TabValue) => ProvidedTabProps;
  getTabListProps: () => ProvidedTabListProps;
  getTabPanelProps: (tabValue: TabValue) => ProvidedTabPanelProps;
  getTabPanelsProps: <E extends HTMLElement>(
    ref?: Ref<E>
  ) => ProvidedTabPanelsProps<E>;
}

/**
 * @example Super Simple
 * ```tsx
 * "use client";
 *
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import { Slide } from "@react-md/core/transition/Slide";
 * import { SlideContainer } from "@react-md/core/transition/SlideContainer";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const {
 *     activeTab,
 *     setActiveTab,
 *     direction,
 *     setDirection,
 *     getTabListProps,
 *     getTabPanelProps,
 *     getTabPanelsProps,
 *     getTabProps,
 *   } = useTabs();
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
 * @see {@link https://next.react-md.dev/components/tabs | Tabs Demos}
 * @since 6.0.0
 */
export function useTabs(): TabsImplementation & {
  activeTab: number;
  setActiveTab: number;
};
/**
 * The tab behavior can be controlled by providing the `activeTab` and
 * `setActiveTab` options.
 *
 * @example Controlled
 * ```tsx
 * "use client";
 *
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import { Slide } from "@react-md/core/transition/Slide";
 * import { SlideContainer } from "@react-md/core/transition/SlideContainer";
 * import { type ReactElement, useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [activeTab, setActiveTab] = useState(1);
 *
 *   const {
 *     direction,
 *     setDirection,
 *     getTabListProps,
 *     getTabPanelProps,
 *     getTabPanelsProps,
 *     getTabProps,
 *   } = useTabs({
 *     activeTab,
 *     setActiveTab,
 *   });
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
 * @see {@link https://next.react-md.dev/components/tabs | Tabs Demos}
 * @since 6.0.0
 */
export function useTabs<TabValue extends number>(
  options: TabsHookOptions<TabValue> & {
    tabs?: readonly TabValue[];
    activeTab: TabValue;
    setActiveTab: Dispatch<TabValue>;
    defaultActiveTab?: never;
  }
): TabsImplementation<TabValue> & { activeTab?: never; setActiveTab?: never };
export function useTabs<TabValue extends number>(
  options: TabsHookOptions<TabValue> & {
    tabs?: readonly TabValue[];
    activeTab?: never;
    setActiveTab?: never;
    defaultActiveTab?: UseStateInitializer<TabValue>;
  }
): TabsImplementation<TabValue> & {
  activeTab: TabValue;
  setActiveTab: Dispatch<TabValue>;
};
/**
 * When using string values, the {@link TabsHookOptions.tabs} option **must** be
 * provided to determine the correct active tab index.
 *
 * @example String Value Simple
 * ```tsx
 * "use client";
 *
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import { Slide } from "@react-md/core/transition/Slide";
 * import { SlideContainer } from "@react-md/core/transition/SlideContainer";
 * import { type ReactElement } from "react";
 *
 * const tabs = ["value-1", "value-2", "value-3"];
 *
 * function Example(): ReactElement {
 *   const {
 *     activeTab,
 *     setActiveTab,
 *     direction,
 *     setDirection,
 *     getTabListProps,
 *     getTabPanelProps,
 *     getTabPanelsProps,
 *     getTabProps,
 *   } = useTabs({ tabs });
 *
 *   return (
 *     <>
 *       <TabList {...getTabListProps()}>
 *         {tabs.map((value) => (
 *           <Tab key={value} {...getTabProps(value)}>{value}</Tab>
 *         ))}
 *       </TabList>
 *       <SlideContainer {...getTabPanelsProps()}>
 *        {tabs.map((value) => (
 *          <Slide key={value}>{value} Content</Slide>
 *        ))}
 *       </SlideContainer>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/tabs | Tabs Demos}
 * @since 6.0.0
 */
export function useTabs<TabValue extends string>(
  options: TabsHookOptions<TabValue> & {
    tabs: readonly TabValue[];
    activeTab?: never;
    setActiveTab?: never;
    defaultActiveTab?: UseStateInitializer<TabValue>;
  }
): TabsImplementation<TabValue> & {
  activeTab: TabValue;
  setActiveTab: Dispatch<TabValue>;
};
/**
 * When using string values, the {@link TabsHookOptions.tabs} option **must** be
 * provided to determine the correct active tab index.
 *
 * @example String Controlled Simple
 * ```tsx
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import { Slide } from "@react-md/core/transition/Slide";
 * import { SlideContainer } from "@react-md/core/transition/SlideContainer";
 * import { type ReactElement } from "react";
 *
 * const tabs = ["value-1", "value-2", "value-3"] as const;
 *
 * function Example(): ReactElement {
 *   const [activeTab, setActiveTab] = useState(tabs[0]);
 *
 *   const {
 *     direction,
 *     setDirection,
 *     getTabListProps,
 *     getTabPanelProps,
 *     getTabPanelsProps,
 *     getTabProps,
 *   } = useTabs({
 *     tabs,
 *     activeTab,
 *     setActiveTab,
 *   });
 *
 *   return (
 *     <>
 *       <TabList {...getTabListProps()}>
 *         {tabs.map((value) => (
 *           <Tab key={value} {...getTabProps(value)}>{value}</Tab>
 *         ))}
 *       </TabList>
 *       <SlideContainer {...getTabPanelsProps()}>
 *        {tabs.map((value) => (
 *          <Slide key={value}>{value} Content</Slide>
 *        ))}
 *       </SlideContainer>
 *     </>
 *   );
 * }
 * ```
 *
 * @example Navigation Tabs
 * ```tsx
 * "use client";
 *
 * import { Tab } from "@react-md/core/tabs/Tab";
 * import { TabList } from "@react-md/core/tabs/TabList";
 * import { useTabs } from "@react-md/core/tabs/useTabs";
 * import Link from "next/link.js";
 * import { usePathname } from "next/navigation.js";
 * import {
 *   type AnchorHTMLAttributes,
 *   type ReactElement,
 *   forwardRef,
 *   useEffect,
 *   useState,
 * } from "react";
 *
 * // this just fixes the `href` type definition causing errors
 * const SimpleLink = forwardRef<
 *   HTMLAnchorElement,
 *   AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
 * >(function SimpleLink(props, ref) {
 *   return <Link {...props} ref={ref} />;
 * });
 *
 * const PATHNAME_TABS = ["/", "/page-1", "/page-2"];
 *
 * function Layout({ children }: PropsWithChildren) {
 *   const pathname = usePathname();
 *   const { getTabListProps, getTabProps } = useTabs({
 *     tabs: PATHNAME_TABS,
 *     activeTab: pathname,
 *     setActiveTab: noop,
 *   });
 *
 *   return (
 *     <>
 *       <TabList {...getTabListProps()}>
 *         <Tab {...getTabProps("/")} href="/" as={SimpleLink}>Home</Tab>
 *         <Tab {...getTabProps("/page-1")} href="/page-1" as={SimpleLink}>Page 1</Tab>
 *         <Tab {...getTabProps("/page-2")} href="/page-2" as={SimpleLink}>Page 2</Tab>
 *       </TabList>
 *       <main>{children}</main>
 *     </>
 *   );
 * }
 * ```
 *
 * @see {@link https://next.react-md.dev/components/tabs | Tabs Demos}
 * @since 6.0.0
 */
export function useTabs<TabValue extends string>(
  options: TabsHookOptions<TabValue> & {
    tabs: readonly TabValue[];
    activeTab: TabValue;
    setActiveTab: Dispatch<TabValue>;
    defaultActiveTab?: never;
  }
): TabsImplementation<TabValue> & { activeTab?: never; setActiveTab?: never };
/**
 * This hook can be uncontrolled/controlled and supports strongly typing the tab
 * values if needed. Check out the overloads for examples.
 *
 * @see {@link https://next.react-md.dev/components/tabs | Tabs Demos}
 * @since 6.0.0
 */
export function useTabs<TabValue extends string | number>(
  options: TabsHookOptions<TabValue> = {}
): TabsImplementation<TabValue> {
  const {
    baseId: propBaseId,
    tabs = EMPTY_LIST,
    stacked,
    vertical,
    iconAfter,
    activeTab: propActiveTab,
    setActiveTab: propSetActiveTab,
    defaultActiveTab,
    disableScrollFix,
    disableTransition,
  } = options;

  const baseId = useEnsuredId(propBaseId, "tab");
  const [direction, setDirection] = useState<SlideDirection>("forward");

  const [activeTab, setActiveTab] = useEnsuredState({
    value: propActiveTab,
    setValue: propSetActiveTab,
    defaultValue: defaultActiveTab ?? (0 as TabValue),
  });

  const getTabIndex = (tabValue: TabValue): number =>
    typeof tabValue === "string" || tabs.length > 0
      ? tabs.indexOf(tabValue)
      : tabValue;
  const getTabId = (tabValue: TabValue, prefix = ""): string =>
    `${baseId}-${prefix}${getTabIndex(tabValue) + 1}`;

  const activeIndex = getTabIndex(activeTab);
  const tabPanelsRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = tabPanelsRef.current;
    if (!container || disableScrollFix) {
      return;
    }

    container.scrollTop = 0;
  }, [disableScrollFix, activeTab]);

  return {
    activeTab,
    setActiveTab,
    direction,
    setDirection,
    getTabProps(tabValue) {
      return {
        "aria-controls": getTabId(tabValue, PANEL_PREFIX),
        id: getTabId(tabValue),
        active: tabValue === activeTab,
        stacked,
        iconAfter,
        activeIndicator: disableTransition,
        verticalActiveIndicator: vertical && disableTransition,
      };
    },
    getTabListProps() {
      return {
        activeIndex,
        setActiveIndex: (nextActiveIndex) => {
          setDirection(activeIndex < nextActiveIndex ? "forward" : "backward");
          if (typeof activeTab === "string" || tabs.length > 0) {
            setActiveTab(tabs[nextActiveIndex]);
          } else {
            setActiveTab(nextActiveIndex as TabValue);
          }
        },
        vertical,
        disableTransition,
      };
    },
    getTabPanelProps(tabValue) {
      return {
        "aria-labelledby": getTabId(tabValue),
        id: getTabId(tabValue, PANEL_PREFIX),
        role: "tabpanel",
        active: tabValue === activeTab,
      };
    },
    getTabPanelsProps(ref) {
      return {
        ref: (instance) => {
          applyRef(instance, ref);
          applyRef(instance, tabPanelsRef);
        },
        direction,
      };
    },
  };
}
