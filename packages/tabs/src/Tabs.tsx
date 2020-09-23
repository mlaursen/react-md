import React, { forwardRef } from "react";

import { Tab } from "./Tab";
import { TabsList, TabsListProps } from "./TabsList";
import { useTabs } from "./TabsManager";

export type TabsProps = Omit<
  TabsListProps,
  "activeIndex" | "onActiveIndexChange"
>;

/**
 * The `Tabs` component is used to render all the configured `tabs` from the
 * parent `TabsManager` component inside of the `TabsList`.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  props,
  ref
) {
  const { tabsId, tabs, activeIndex, onActiveIndexChange } = useTabs();
  return (
    <TabsList
      {...props}
      id={tabsId}
      ref={ref}
      activeIndex={activeIndex}
      onActiveIndexChange={onActiveIndexChange}
    >
      {tabs.map(({ id, ...config }, index) => (
        <Tab {...config} id={id} key={id} active={activeIndex === index} />
      ))}
    </TabsList>
  );
});
