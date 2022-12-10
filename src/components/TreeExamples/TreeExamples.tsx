import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
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
      </Box>
    </Resettable>
  );
}
