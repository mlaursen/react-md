import { Tab, TabList, useTabs } from "@react-md/tabs";
import type { ReactElement } from "react";

const tabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);

export function ScrollableTabs(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs();

  return (
    <div style={{ maxWidth: "30rem", marginBottom: "10rem", width: "100%" }}>
      <TabList {...getTabListProps()} scrollButtons>
        {tabs.map((name, i) => (
          <Tab key={name} {...getTabProps(i)}>
            {name}
          </Tab>
        ))}
      </TabList>
    </div>
  );
}
