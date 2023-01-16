import { Box } from "@react-md/core";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "../DemoHeadingWithDivider";
import { Resettable } from "../Resettable";
import { MultipleExample } from "./MultipleExample";
import { RequiredExample } from "./RequiredExample";
import { SimpleExample } from "./SimpleExample";
import { WithMessagingExample } from "./WithMessagingExample";

export default function NativeSelectExamples(): ReactElement {
  return (
    <Resettable>
      <Box stacked>
        <DemoHeadingWithDivider>Simple Example</DemoHeadingWithDivider>
        <SimpleExample />
        <DemoHeadingWithDivider>Required Example</DemoHeadingWithDivider>
        <RequiredExample />
        <DemoHeadingWithDivider>With Messaging Example</DemoHeadingWithDivider>
        <WithMessagingExample />
        <DemoHeadingWithDivider>Multiple Example</DemoHeadingWithDivider>
        <MultipleExample />
      </Box>
    </Resettable>
  );
}
