import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { ResizableHorizontalSheetExample } from "./ResizableHorizontalSheetExample";
import { ResizableVerticalSheetExample } from "./ResizableVerticalSheetExample";
import { SimpleHorizontalExample } from "./SimpleHorizontalExample";
import { SimpleVerticalExample } from "./SimpleVerticalExample";

export default function WindowSplitterExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>
          Simple Horizontal Example
        </DemoHeadingWithDivider>
        <SimpleHorizontalExample />
        <DemoHeadingWithDivider>Simple Vertical Example</DemoHeadingWithDivider>
        <SimpleVerticalExample />
        <DemoHeadingWithDivider>
          Resizable Horizontal Sheet Example
        </DemoHeadingWithDivider>
        <ResizableHorizontalSheetExample />
        <DemoHeadingWithDivider>
          Resizable Vertical Sheet Example
        </DemoHeadingWithDivider>
        <ResizableVerticalSheetExample />
      </Box>
    </Resettable>
  );
}
