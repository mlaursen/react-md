import React, { FC } from "react";
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { Text } from "@react-md/typography";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

const BasicUsage: FC = () => (
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

export default BasicUsage;
