/* eslint-disable react/no-array-index-key */
import React, { FC, Fragment } from "react";
import { TabPanel, TabPanels, Tabs, TabsManager } from "@react-md/tabs";

import "./ConfigurableTabs.scss";

import ConfigurationForm from "./ConfigurationForm";
import PanelContent from "./PanelContent";
import useConfiguration from "./useConfiguration";
import styles from "./styles";

const ConfigurableTabs: FC = () => {
  const { tabs, ...configuration } = useConfiguration();
  const {
    themed,
    padded,
    automatic,

    stacked,
    iconAfter,

    persistent,
    customTransition,
    disableTransition,
  } = configuration;

  return (
    <Fragment>
      <ConfigurationForm {...configuration} />
      <div className={styles()}>
        <TabsManager
          tabsId="configurable-tabs"
          tabs={tabs}
          stacked={stacked}
          iconAfter={iconAfter}
        >
          <Tabs
            automatic={automatic}
            padded={padded}
            className={styles("tabs", { themed })}
          />
          <TabPanels
            disableTransition={disableTransition || customTransition}
            persistent={persistent}
          >
            {tabs.map((_, i) => (
              <TabPanel key={i} className={styles("content")}>
                <PanelContent i={i} customTransition={customTransition} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabsManager>
      </div>
    </Fragment>
  );
};

export default ConfigurableTabs;
