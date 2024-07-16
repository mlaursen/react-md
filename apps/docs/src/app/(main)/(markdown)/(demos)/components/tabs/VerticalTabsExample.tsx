"use client";
import { Box } from "@react-md/core/box/Box";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Slide } from "@react-md/core/transition/Slide";
import { SlideContainer } from "@react-md/core/transition/SlideContainer";
import { type ReactElement } from "react";
import styles from "./VerticalTabsExample.module.scss";

export default function VerticalTabsExample(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <Box grid fullWidth disablePadding className={styles.container}>
      <TabList {...getTabListProps()} vertical>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()}>
        <Slide {...getTabPanelProps(0)}>Tab 1 Content</Slide>
        <Slide {...getTabPanelProps(1)}>Tab 2 Content</Slide>
        <Slide {...getTabPanelProps(2)}>Tab 3 Content</Slide>
      </SlideContainer>
    </Box>
  );
}
