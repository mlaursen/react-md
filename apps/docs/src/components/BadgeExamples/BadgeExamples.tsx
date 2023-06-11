import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { SimpleExample } from "./SimpleExample";
import { WithinButtons } from "./WithinButtons";

export default function BadgeExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Within Buttons</DemoHeadingWithDivider>
        <WithinButtons />
      </Box>
    </Resettable>
  );
}
