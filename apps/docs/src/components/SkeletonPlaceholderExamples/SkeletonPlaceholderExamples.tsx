import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { PrerenderingLayout } from "./PrerenderingLayout";
import { SimpleExamples } from "./SimpleExamples";
import { UsingTheHook } from "./UsingTheHook";

export default function SkeletonPlaceholderExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExamples />
        <DemoHeadingWithDivider>Using the Hook</DemoHeadingWithDivider>
        <UsingTheHook />
        <DemoHeadingWithDivider>Pre-rendering Layout</DemoHeadingWithDivider>
        <PrerenderingLayout />
      </Box>
    </Resettable>
  );
}
