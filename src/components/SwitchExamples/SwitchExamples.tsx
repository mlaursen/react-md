import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { DifferentSizes } from "./DifferentSizes";
import { SimpleSwitches } from "./SimpleSwitches";
import { StackedSwitches } from "./StackedSwitches";

export default function SwitchExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Switches</DemoHeadingWithDivider>
        <SimpleSwitches />
        <DemoHeadingWithDivider>Stacked Switches</DemoHeadingWithDivider>
        <StackedSwitches />
        <DemoHeadingWithDivider>Different Sizes</DemoHeadingWithDivider>
        <DifferentSizes />
      </Box>
    </Resettable>
  );
}
