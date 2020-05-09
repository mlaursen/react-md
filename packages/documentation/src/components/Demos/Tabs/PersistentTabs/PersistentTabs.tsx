import React, { FC } from "react";
import { AppBar } from "@react-md/app-bar";
import { Checkbox, useChecked } from "@react-md/form";
import { TabsManager, Tabs, TabPanels } from "@react-md/tabs";

import "./PersistentTabs.scss";
import Content1 from "./Content1";
import Content2 from "./Content2";

const tabs = ["Tab 1", "Tab 2"];

const PersistentTabs: FC = () => {
  const [persistent, handleChange] = useChecked(false);
  return (
    <TabsManager tabs={tabs} tabsId="persistent-tabs">
      <AppBar theme="default" height="none">
        <AppBar>
          <Checkbox
            id="persistent-tab-enable"
            checked={persistent}
            onChange={handleChange}
            label="Enable Persistant Tabs"
          />
        </AppBar>
        <Tabs />
      </AppBar>
      <TabPanels persistent={persistent} className="persistent-tabs">
        <Content1 />
        <Content2 />
      </TabPanels>
    </TabsManager>
  );
};

export default PersistentTabs;
