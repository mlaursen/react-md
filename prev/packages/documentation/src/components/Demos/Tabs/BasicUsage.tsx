import type { ReactElement } from "react";
import { TabsManager, Tabs, TabPanels, TabPanel } from "@react-md/tabs";
import { Typography } from "@react-md/typography";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

export default function BasicUsage(): ReactElement {
  return (
    <TabsManager tabs={tabs} tabsId="basic-usage-tabs">
      <Tabs />
      <TabPanels>
        <TabPanel>
          <Typography type="headline-4">Panel 1</Typography>
        </TabPanel>
        <TabPanel>
          <Typography type="headline-4">Panel 2</Typography>
        </TabPanel>
        <TabPanel>
          <Typography type="headline-4">Panel 3</Typography>
        </TabPanel>
      </TabPanels>
    </TabsManager>
  );
}
