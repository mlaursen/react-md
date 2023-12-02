"use client";
import {
  AppBar,
  Button,
  Tab,
  TabList,
  Typography,
  useTabs,
} from "@react-md/core";
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
