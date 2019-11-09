/* eslint-disable react/no-array-index-key */
import React, { FC, Fragment } from "react";
import { TabPanel, TabPanels, Tabs, TabsManager } from "@react-md/tabs";
import { bem } from "@react-md/utils";

import "./ConfigurableTabs.scss";

import ConfigurationForm from "./ConfigurationForm";
import PanelContent from "./PanelContent";
import useConfiguration from "./useConfiguration";

const block = bem("configurable-tabs");

const ConfigurableTabs: FC = () => {
  const { tabs, ...configuration } = useConfiguration();
  const {
    stacked,
    iconAfter,
    padded,
    customTransition,
    disableTransition,
    themed,
  } = configuration;

  return (
    <Fragment>
      <ConfigurationForm {...configuration} />
      <div className={block()}>
        <TabsManager
          tabsId="configurable-tabs"
          tabs={tabs}
          stacked={stacked}
          iconAfter={iconAfter}
        >
          <Tabs
            padded={padded}
            className={block("tabs", { themed })}
            orientation="vertical"
          />
          <TabPanels
            /* the key is used here since swapping the disableTransition */
            /* prop causes the animation to fire again otherwise */
            key={`${disableTransition || customTransition}`}
            disableTransition={disableTransition || customTransition}
          >
            {tabs.map((_, i) => (
              <TabPanel key={i} className={block("content")}>
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
