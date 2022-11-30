import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { IncludingCircularProgress } from "./IncludingCircularProgress";
import { OutlinedChips } from "./OutlinedChips";
import { SelectableChips } from "./SelectableChips";
import { SolidChips } from "./SolidChips";
import { StylesOnly } from "./StylesOnly";

export default function ChipExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Solid Chips</DemoHeadingWithDivider>
        <SolidChips />
        <DemoHeadingWithDivider>Outlined Chips</DemoHeadingWithDivider>
        <OutlinedChips />
        <DemoHeadingWithDivider>Selectable Chips</DemoHeadingWithDivider>
        <SelectableChips />
        <DemoHeadingWithDivider>
          Including Circular Progress
        </DemoHeadingWithDivider>
        <IncludingCircularProgress />
        <DemoHeadingWithDivider>Styles Only</DemoHeadingWithDivider>
        <StylesOnly />
      </Box>
    </Resettable>
  );
}
