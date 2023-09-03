import { Tab, TabList, useTabs } from "@react-md/core";
import type { ReactElement } from "react";

const tabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);

export function ScrollableTabsWithScrollbar(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <div style={{ maxWidth: "30rem", marginBottom: "10rem", width: "100%" }}>
      <TabList {...getTabListProps()} scrollButtons scrollbar>
        {tabs.map((name, i) => (
          <Tab key={name} {...getTabProps(i)}>
            {name}
          </Tab>
        ))}
      </TabList>
    </div>
  );
}