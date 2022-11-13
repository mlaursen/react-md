import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { CollapseHookExample } from "./CollapseHookExample";
import { ConfigurableExample } from "./ConfigurableExample";
import { SimpleExample } from "./SimpleExample";

export default function CollapseExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Collapse Hook Example</DemoHeadingWithDivider>
        <CollapseHookExample />
        <DemoHeadingWithDivider>Configurable Example</DemoHeadingWithDivider>
        <ConfigurableExample />
      </Box>
    </Resettable>
  );
}
