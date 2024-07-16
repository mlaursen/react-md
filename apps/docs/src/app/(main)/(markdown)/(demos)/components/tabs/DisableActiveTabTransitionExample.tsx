"use client";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

function DisableActiveTabTransitionExample(): ReactElement {
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

//.This behaves the same as the component above but also disables transitions
// for the tab panels. Try setting `VERBOSE` to `false`
function DisableActiveTabTransitionExample2(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs({ disableTransition: true });

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
  ? DisableActiveTabTransitionExample
  : DisableActiveTabTransitionExample2;
