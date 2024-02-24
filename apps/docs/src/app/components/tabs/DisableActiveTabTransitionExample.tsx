"use client";
import { Tab, TabList, useTabs } from "@react-md/core";
import { type ReactElement } from "react";

export default function DisableActiveTabTransitionExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <div>
      <TabList {...getTabListProps()} disableTransition>
        <Tab {...getTabProps(0)} activeIndicator>
          Tab 1
        </Tab>
        <Tab {...getTabProps(1)} activeIndicator>
          Tab 2
        </Tab>
        <Tab {...getTabProps(2)} activeIndicator>
          Tab 3
        </Tab>
      </TabList>
    </div>
  );
}