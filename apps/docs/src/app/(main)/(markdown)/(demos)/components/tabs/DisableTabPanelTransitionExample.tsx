"use client";

import { SimpleTabPanel } from "@react-md/core/tabs/SimpleTabPanel";
import { SimpleTabPanels } from "@react-md/core/tabs/SimpleTabPanels";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

export default function DisableTabPanelTransitionExample(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs({ disableTransition: true });

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SimpleTabPanels {...getTabPanelsProps()}>
        <SimpleTabPanel {...getTabPanelProps(0)}>Tab 1 Content</SimpleTabPanel>
        <SimpleTabPanel {...getTabPanelProps(1)}>Tab 2 Content</SimpleTabPanel>
        <SimpleTabPanel {...getTabPanelProps(2)}>Tab 3 Content</SimpleTabPanel>
      </SimpleTabPanels>
    </>
  );
}
