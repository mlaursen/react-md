import { ReactElement, ReactNode } from "react";
import {
  AppBar,
  Checkbox,
  Slide,
  SlideContainer,
  Tab,
  TabList,
  TabProps,
  useChecked,
  useTabs,
} from "react-md";

import Content1 from "./Content1";
import Content2 from "./Content2";
import styles from "./PersistentTabs.module.scss";

const tabs = ["Tab 1", "Tab 2"] as const;

export default function Demo(): ReactElement {
  const [persistent, handleChange] = useChecked(false);

  const {
    getTabProps,
    getTabListProps,
    getTabPanelProps,
    getTabPanelsProps
  } = useTabs({
    baseId: "persistent-tabs"
  });

  return <>
    <AppBar theme="default" height="none">
      <AppBar>
        <Checkbox
          id="persistent-tab-enable"
          checked={persistent}
          onChange={handleChange}
          label="Enable Persistent Tabs"
        />
      </AppBar>
      <TabList {...getTabListProps()}>{tabs.map((tab, i) => {
          const tabProps = getTabProps(i);
          let children: ReactNode;
          let overrides: TabProps | undefined;

          if (typeof tab !== "string" && "children" in tab) {
            children = tab.children;

            const {
              children: _c,
              contentStyle: _cs,
              contentClassName: _ccn,
              ...stillValidProps
            } = tab;

            overrides = stillValidProps;
          } else {
            children = tab;
          }

          return <Tab {...tabProps} {...overrides} key={tabProps.id}>{children}</Tab>;
        })}</TabList>
    </AppBar>
    <SlideContainer {...getTabPanelsProps()} className={styles.container}>
      <Slide {...getTabPanelProps(0)}>
        <Content1 />
      </Slide>
      <Slide {...getTabPanelProps(1)}>
        <Content2 />
      </Slide>
    </SlideContainer>
  </>;
}
