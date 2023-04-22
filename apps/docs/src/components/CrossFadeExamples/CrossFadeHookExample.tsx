import {
  AppBar,
  Tab,
  TabList,
  useCrossFadeTransition,
  useTabs,
} from "@react-md/core";
import type { ReactElement } from "react";
import { ExamplePage1 } from "../ExamplePage1";
import { ExamplePage2 } from "../ExamplePage2";
import { ExamplePage3 } from "../ExamplePage3";

export function CrossFadeHookExample(): ReactElement {
  const { elementProps, transitionTo } = useCrossFadeTransition();
  const { activeIndex, getTabProps, getTabListProps } = useTabs({
    onActiveIndexChange() {
      transitionTo("enter");
    },
  });
  return (
    <>
      <AppBar theme="surface" height="auto">
        <TabList {...getTabListProps()} align="center">
          <Tab {...getTabProps(0)}>Page 1</Tab>
          <Tab {...getTabProps(1)}>Page 2</Tab>
          <Tab {...getTabProps(2)}>Page 3</Tab>
        </TabList>
      </AppBar>
      <div {...elementProps}>
        {activeIndex === 0 && <ExamplePage1 />}
        {activeIndex === 1 && <ExamplePage2 />}
        {activeIndex === 2 && <ExamplePage3 />}
      </div>
    </>
  );
}
