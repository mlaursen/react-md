"use client";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import {
  useTabs,
  type ProvidedTabPanelProps,
  type ProvidedTabPanelsProps,
} from "@react-md/core/tabs/useTabs";
import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { forwardRef, type ReactElement, type ReactNode } from "react";

export default function CustomTabPanelsExample(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Tab 1</Tab>
        <Tab {...getTabProps(1)}>Tab 2</Tab>
        <Tab {...getTabProps(2)}>Tab 3</Tab>
      </TabList>
      <TabPanels {...getTabPanelsProps()}>
        <TabPanel {...getTabPanelProps(0)}>Tab 1 Content</TabPanel>
        <TabPanel {...getTabPanelProps(1)}>Tab 2 Content</TabPanel>
        <TabPanel {...getTabPanelProps(2)}>Tab 3 Content</TabPanel>
      </TabPanels>
    </>
  );
}

interface TabPanelsProps
  extends Omit<ProvidedTabPanelsProps<HTMLDivElement>, "ref"> {
  children: ReactNode;
}

// must forward ref so that switching tabs scrolls to the top
const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  function TabPanels(props, ref) {
    const { children } = props;
    return <div ref={ref}>{children}</div>;
  }
);

interface TabPanelProps extends ProvidedTabPanelProps {
  children: ReactNode;
}

function TabPanel(props: TabPanelProps): ReactElement {
  const { active, children, ...remaining } = props;
  return (
    <div {...remaining} className={cnb(!active && DISPLAY_NONE_CLASS)}>
      {children}
    </div>
  );
}
