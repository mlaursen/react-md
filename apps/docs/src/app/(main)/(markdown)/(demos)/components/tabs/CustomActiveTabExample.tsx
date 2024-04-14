"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { Button } from "@react-md/core/button/Button";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

const tabs = ["tab-1", "tab-2", "tab-3", "tab-4"];

export default function CustomActiveTabExample(): ReactElement {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { getTabProps, getTabListProps } = useTabs({
    tabs,
    activeTab,
    setActiveTab,
  });

  return (
    <>
      <AppBar height="auto" theme="surface">
        <TabList {...getTabListProps()}>
          {tabs.map((tab, i) => (
            <Tab key={i} {...getTabProps(tab)}>
              {`Tab ${i + 1}`}
            </Tab>
          ))}
        </TabList>
      </AppBar>
      <Typography>{`The current activeTab is ${activeTab}`}</Typography>
      <Button onClick={() => setActiveTab("tab-1")}>Set 1</Button>
      <Button onClick={() => setActiveTab("tab-2")}>Set 2</Button>
    </>
  );
}
