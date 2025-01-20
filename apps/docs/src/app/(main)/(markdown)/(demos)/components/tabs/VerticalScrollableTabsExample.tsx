"use client";

import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

import styles from "./VerticalScrollableTabsExample.module.scss";

export default function VerticalScrollableTabsExample(): ReactElement {
  const { getTabProps, getTabListProps } = useTabs({ vertical: true });

  const scrollbar = false;

  return (
    <TabList
      {...getTabListProps()}
      scrollbar={scrollbar}
      scrollButtons
      className={styles.container}
    >
      {tabs.map((name, i) => (
        <Tab key={name} {...getTabProps(i)}>
          {name}
        </Tab>
      ))}
    </TabList>
  );
}

const tabs = Array.from({ length: 20 }, (_, i) => `Tab ${i + 1}`);
