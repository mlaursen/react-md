import type { ReactElement } from "react";
import { TabPanel, TabPanels, Tabs, TabsManager, Typography } from "react-md";

const tabs = ["Tab 1", "Tab 2", "Tab 3"];

export default function Demo(): ReactElement {
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
