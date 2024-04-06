"use client";
import { Slide, SlideContainer, Tab, TabList, useTabs } from "react-md";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()}>
        <Slide {...getTabPanelProps(0)}>Tab 1 Content</Slide>
        <Slide {...getTabPanelProps(1)}>Tab 2 Content</Slide>
        <Slide {...getTabPanelProps(2)}>Tab 3 Content</Slide>
      </SlideContainer>
    </>
  );
}
