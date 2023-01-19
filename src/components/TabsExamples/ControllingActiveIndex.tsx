import { AppBar } from "@react-md/app-bar";
import { Button, Tab, TabList, Typography, useTabs } from "@react-md/core";
import type { ReactElement } from "react";

import styles from "./ControllingActiveIndex.module.scss";

export function ControllingActiveIndex(): ReactElement {
  const { getTabProps, getTabListProps, activeIndex, setActiveIndex } =
    useTabs();
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
      <Typography>{`The current activeIndex is ${activeIndex}`}</Typography>
      <Button onClick={() => setActiveIndex(0)}>Set 0</Button>
      <Button onClick={() => setActiveIndex(1)}>Set 1</Button>
    </div>
  );
}
