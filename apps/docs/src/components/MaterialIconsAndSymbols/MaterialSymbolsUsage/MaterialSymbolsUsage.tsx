import { Slide, SlideContainer, Tab, TabList, useTabs } from "@react-md/core";
import type { ReactElement } from "react";

import { IncludingStylesheet } from "./IncludingStylesheet";
import styles from "./MaterialSymbolsUsage.module.scss";
import { Usage } from "./Usage";

export function MaterialSymbolsUsage(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Usage</Tab>
        <Tab {...getTabProps(1)}>Stylesheet</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={styles.container}>
        <Slide {...getTabPanelProps(0)}>
          <Usage />
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <IncludingStylesheet />
        </Slide>
      </SlideContainer>
    </>
  );
}
