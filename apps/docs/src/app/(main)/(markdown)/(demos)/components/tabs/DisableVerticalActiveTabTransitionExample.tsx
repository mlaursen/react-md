"use client";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

function DisableVerticalActiveTabTransitionExample(): ReactElement {
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

function DisableVerticalActiveTabTransitionExample2(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs({
    vertical: true,
    disableTransition: true,
  });

  return (
    <div>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
    </div>
  );
}

const VERBOSE = true;

export default VERBOSE
  ? DisableVerticalActiveTabTransitionExample
  : DisableVerticalActiveTabTransitionExample2;
