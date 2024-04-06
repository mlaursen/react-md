"use client";
import { AppBar, Button, Tab, TabList, Typography, useTabs } from "react-md";
import { useState, type ReactElement } from "react";

export default function CustomActiveTabIndexExample(): ReactElement {
  const [activeTab, setActiveTab] = useState(0);
  const { getTabProps, getTabListProps } = useTabs({
    activeTab,
    setActiveTab,
  });

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
      <Button onClick={() => setActiveTab(0)}>Set 0</Button>
      <Button onClick={() => setActiveTab(1)}>Set 1</Button>
    </>
  );
}
