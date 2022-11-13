import { AppBar } from "@react-md/app-bar";
import { CrossFade } from "@react-md/core";
import { Tab, TabList, useTabs } from "@react-md/tabs";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import { ExamplePage1 } from "../ExamplePage1";
import { ExamplePage2 } from "../ExamplePage2";
import { ExamplePage3 } from "../ExamplePage3";

export function SimpleExample(): ReactElement {
  const { activeIndex, getTabProps, getTabListProps } = useTabs();
  let content = <ExamplePage1 />;
  if (activeIndex === 1) {
    content = <ExamplePage2 />;
  } else if (activeIndex === 2) {
    content = <ExamplePage3 />;
  }

  const rendered = useRef(false);
  useEffect(() => {
    rendered.current = true;
  }, []);

  return (
    <div>
      <AppBar theme="surface" height="auto">
        <TabList {...getTabListProps()} align="center">
          <Tab {...getTabProps(0)}>Page 1</Tab>
          <Tab {...getTabProps(1)}>Page 2</Tab>
          <Tab {...getTabProps(2)}>Page 3</Tab>
        </TabList>
      </AppBar>
      <CrossFade key={activeIndex} appear={rendered.current}>
        {content}
      </CrossFade>
    </div>
  );
}
