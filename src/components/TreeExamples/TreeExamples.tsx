import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { DecreasingSpacingExample } from "./DecreasingSpacingExample";
import { IconExpanderBeforeExample } from "./IconExpanderBeforeExample";
import { IconExpansionExample } from "./IconExpansionExample";
import { MultiSelectTree } from "./MultiSelectTree";
import { SingleSelectTree } from "./SingleSelectTree";

export default function TreeExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Single Select Tree</DemoHeadingWithDivider>
        <SingleSelectTree />
        <DemoHeadingWithDivider>Multi Select Tree</DemoHeadingWithDivider>
        <MultiSelectTree />
        <DemoHeadingWithDivider>Icon Expansion Example</DemoHeadingWithDivider>
        <IconExpansionExample />
        <DemoHeadingWithDivider>
          Icon Expander Before Example
        </DemoHeadingWithDivider>
        <IconExpanderBeforeExample />
        <DemoHeadingWithDivider>
          Decreasing Spacing Example
        </DemoHeadingWithDivider>
        <DecreasingSpacingExample />
      </Box>
    </Resettable>
  );
}
