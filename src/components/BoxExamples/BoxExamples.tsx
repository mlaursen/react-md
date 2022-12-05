import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { FlexBoxExample } from "./FlexBoxExample";
import { GridBoxExample } from "./GridBoxExample";

export default function BoxExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Flex Box Example</DemoHeadingWithDivider>
        <FlexBoxExample />
        <DemoHeadingWithDivider>Grid Box Example</DemoHeadingWithDivider>
        <GridBoxExample />
      </Box>
    </Resettable>
  );
}
