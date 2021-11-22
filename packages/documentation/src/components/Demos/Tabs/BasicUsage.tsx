import { ReactElement } from "react";
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { Text } from "@react-md/typography";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

export default function BasicUsage(): ReactElement {
  return (
    <TabsManager tabs={tabs} tabsId="basic-usage-tabs">
      <Tabs />
      <TabPanels>
        <TabPanel>
          <Text type="headline-4">Panel 1</Text>
        </TabPanel>
        <TabPanel>
          <Text type="headline-4">Panel 2</Text>
        </TabPanel>
        <TabPanel>
          <Text type="headline-4">Panel 3</Text>
        </TabPanel>
      </TabPanels>
    </TabsManager>
  );
}
