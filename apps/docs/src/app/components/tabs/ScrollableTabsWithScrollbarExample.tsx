"use client";
import { Tab, TabList, useTabs } from "@react-md/core";
import { type ReactElement } from "react";

export default function ScrollableTabsWithScrollbarExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();
  return (
    <>
      <TabList {...getTabListProps()} scrollButtons scrollbar>
        {tabs.map((name, i) => (
          <Tab key={name} {...getTabProps(i)}>
            {name}
          </Tab>
        ))}
      </TabList>
    </>
  );
}

const tabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);
