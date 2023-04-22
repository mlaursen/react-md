import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ControllingActiveIndex } from "./ControllingActiveIndex";
import { ScrollableTabs } from "./ScrollableTabs";
import { ScrollableTabsWithScrollbar } from "./ScrollableTabsWithScrollbar";
import { SimpleExample } from "./SimpleExample";
import { TabsWithAnIcon } from "./TabsWithAnIcon";

export default function TabsExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Tabs With an Icon</DemoHeadingWithDivider>
        <TabsWithAnIcon />
        <DemoHeadingWithDivider>
          Controlling the Active Index
        </DemoHeadingWithDivider>
        <ControllingActiveIndex />
        <DemoHeadingWithDivider>Scrollable Tabs</DemoHeadingWithDivider>
        <ScrollableTabs />
        <DemoHeadingWithDivider>
          Scrollable Tabs with Scrollbar
        </DemoHeadingWithDivider>
        <ScrollableTabsWithScrollbar />
      </Box>
    </Resettable>
  );
}
