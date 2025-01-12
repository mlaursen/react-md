import { type PackageManager } from "@react-md/code/PackageManagerProvider";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import {
  type ProvidedTabListProps,
  type ProvidedTabProps,
} from "@react-md/core/tabs/useTabs";
import { type ReactElement } from "react";

import styles from "./PackageManagerTabs.module.scss";

export interface PackageManagerTabsProps {
  getTabProps: (packageManager: PackageManager) => ProvidedTabProps;
  getTabListProps: () => ProvidedTabListProps;
  packageManagers: readonly PackageManager[];
}

export function PackageManagerTabs({
  getTabProps,
  getTabListProps,
  packageManagers,
}: PackageManagerTabsProps): ReactElement {
  return (
    <TabList
      {...getTabListProps()}
      inline
      className={styles.tabs}
      disableTransition
    >
      {packageManagers.map((name) => (
        <Tab
          key={name}
          {...getTabProps(name)}
          className={styles.tab}
          activeIndicator
        >
          {name}
        </Tab>
      ))}
    </TabList>
  );
}
