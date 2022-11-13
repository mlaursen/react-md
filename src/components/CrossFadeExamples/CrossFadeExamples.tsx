import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { CrossFadeHookExample } from "./CrossFadeHookExample";
import { SimpleExample } from "./SimpleExample";
import { WithAsyncSuspense } from "./WithAsyncSuspense";

export default function CrossFadeExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>With Async Suspense</DemoHeadingWithDivider>
        <WithAsyncSuspense />
        <DemoHeadingWithDivider>Cross Fade Hook Example</DemoHeadingWithDivider>
        <CrossFadeHookExample />
      </Box>
    </Resettable>
  );
}
