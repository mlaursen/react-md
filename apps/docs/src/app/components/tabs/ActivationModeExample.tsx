"use client";
import { Tab, TabList, useTabs } from "@react-md/core";
import { type ReactElement } from "react";

export default function ActivationModeExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <TabList
      {...getTabListProps()}
      activationMode="automatic"
      // it's recommended to disable the transition for the active indicator and
      // enable active indicators on each tab when tabs are selected immediately
      disableTransition
    >
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
  );
}
