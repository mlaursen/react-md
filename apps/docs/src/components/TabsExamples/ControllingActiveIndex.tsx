import {
  AppBar,
  Button,
  Tab,
  TabList,
  Typography,
  useTabs,
} from "@react-md/core";
import { type ReactElement } from "react";

import styles from "./ControllingActiveIndex.module.scss";

export function ControllingActiveIndex(): ReactElement {
  const { getTabProps, getTabListProps, activeTab, setActiveTab } = useTabs();
  return (
    <div className={styles.container}>
      <AppBar height="auto" theme="surface">
        <TabList {...getTabListProps()}>
          {Array.from({ length: 4 }, (_, i) => (
            <Tab key={i} {...getTabProps(i)}>
              {`Tab ${i + 1}`}
            </Tab>
          ))}
        </TabList>
      </AppBar>
      <Typography>{`The current activeTab is ${activeTab}`}</Typography>
      <Button onClick={() => setActiveTab(0)}>Set 0</Button>
      <Button onClick={() => setActiveTab(1)}>Set 1</Button>
    </div>
  );
}
