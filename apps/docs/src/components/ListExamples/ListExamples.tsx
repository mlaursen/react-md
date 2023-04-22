import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { SingleLineExamples } from "./SingleLineExamples";
import { ThreeLineExamples } from "./ThreeLineExamples";
import { TwoLineExamples } from "./TwoLineExamples";

export default function ListExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Single Line Examples</DemoHeadingWithDivider>
        <SingleLineExamples />
        <DemoHeadingWithDivider>Two Line Examples</DemoHeadingWithDivider>
        <TwoLineExamples />
        <DemoHeadingWithDivider>Three Line Examples</DemoHeadingWithDivider>
        <ThreeLineExamples />
      </Box>
    </Resettable>
  );
}
