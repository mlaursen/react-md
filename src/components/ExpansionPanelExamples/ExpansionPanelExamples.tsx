import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { CustomExpansionListExample } from "./CustomExpansionListExample";
import { CustomPanelExpansionExample } from "./CustomPanelExpansionExample";
import { DefaultExpandedIndexExample } from "./DefaultExpandedIndexExample";
import { DisableTransitionExample } from "./DisableTransitionExample";
import { HeaderChildrenExample } from "./HeaderChildrenExample";
import { MultipleExpandedPanelsExample } from "./MultipleExpandedPanelsExample";
import { PreventAllPanelsClosedExample } from "./PreventAllPanelsClosedExample";
import { SimpleExample } from "./SimpleExample";
import { SinglePanelExample } from "./SinglePanelExample";

export default function ExpansionPanelExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>
          Default Expanded Index Example
        </DemoHeadingWithDivider>
        <DefaultExpandedIndexExample />
        <DemoHeadingWithDivider>
          Multiple Expanded Panels Example
        </DemoHeadingWithDivider>
        <MultipleExpandedPanelsExample />
        <DemoHeadingWithDivider>
          Prevent All Panels Closed
        </DemoHeadingWithDivider>
        <PreventAllPanelsClosedExample />
        <DemoHeadingWithDivider>
          Custom Panel Expansion Example
        </DemoHeadingWithDivider>
        <CustomPanelExpansionExample />
        <DemoHeadingWithDivider>
          Disable Transition Example
        </DemoHeadingWithDivider>
        <DisableTransitionExample />
        <DemoHeadingWithDivider>Single Panel Example</DemoHeadingWithDivider>
        <SinglePanelExample />
        <DemoHeadingWithDivider>
          Custom Expansion List Example
        </DemoHeadingWithDivider>
        <CustomExpansionListExample />
        <DemoHeadingWithDivider>Header Children Example</DemoHeadingWithDivider>
        <HeaderChildrenExample />
      </Box>
    </Resettable>
  );
}
