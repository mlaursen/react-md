import type { ReactElement } from "react";
import {
  AppBar,
  Checkbox,
  TabPanel,
  TabPanels,
  Tabs,
  TabsManager,
  useChecked,
} from "react-md";

import Content1 from "./Content1";
import Content2 from "./Content2";
import styles from "./PersistentTabs.module.scss";

const tabs = ["Tab 1", "Tab 2"] as const;

export default function Demo(): ReactElement {
  const [persistent, handleChange] = useChecked(false);
  return (
    <TabsManager tabs={tabs} tabsId="persistent-tabs">
      <AppBar theme="default" height="none">
        <AppBar>
          <Checkbox
            id="persistent-tab-enable"
            checked={persistent}
            onChange={handleChange}
            label="Enable Persistent Tabs"
          />
        </AppBar>
        <Tabs />
      </AppBar>
      <TabPanels persistent={persistent} className={styles.container}>
        <TabPanel>
          <Content1 />
        </TabPanel>
        <TabPanel>
          <Content2 />
        </TabPanel>
      </TabPanels>
    </TabsManager>
  );
}
