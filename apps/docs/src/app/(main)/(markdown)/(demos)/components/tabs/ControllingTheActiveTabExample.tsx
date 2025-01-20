"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { Button } from "@react-md/core/button/Button";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function ControllingTheActiveTabExample(): ReactElement {
  const { getTabProps, getTabListProps, activeTab, setActiveTab } = useTabs();

  return (
    <>
      <AppBar height="auto" theme="surface">
        <TabList {...getTabListProps()}>
          {Array.from({ length: 4 }, (_, i) => (
            <Tab key={i} {...getTabProps(i)}>
              {`Tab ${i + 1}`}
            </Tab>
          ))}
        </TabList>
      </AppBar>
      <Typography>{`The current activeIndex is ${activeTab}`}</Typography>
      <Button
        onClick={() => {
          setActiveTab(0);
        }}
      >
        Set 0
      </Button>
      <Button
        onClick={() => {
          setActiveTab(1);
        }}
      >
        Set 1
      </Button>
    </>
  );
}
