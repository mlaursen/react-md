"use client";
import { Tab, TabList, useTabs } from "@react-md/core";
import { type ReactElement } from "react";

export default function DisableVerticalActiveTabTransitionExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <div>
      <TabList {...getTabListProps()} vertical disableTransition>
        <Tab {...getTabProps(0)} activeIndicator verticalActiveIndicator>
          Tab 1
        </Tab>
        <Tab {...getTabProps(1)} activeIndicator verticalActiveIndicator>
          Tab 2
        </Tab>
        <Tab {...getTabProps(2)} activeIndicator verticalActiveIndicator>
          Tab 3
        </Tab>
      </TabList>
    </div>
  );
}
