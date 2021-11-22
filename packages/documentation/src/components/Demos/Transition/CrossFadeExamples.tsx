import { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import Code from "components/Code";

import CrossFadeExamplesAsync from "./CrossFadeExamplesAsync";
import CrossFadeExamplesStatic from "./CrossFadeExamplesStatic";

export default function CrossFadeExamples(): ReactElement {
  return (
    <>
      <Text type="headline-6" margin="bottom">
        Static Transitions
      </Text>
      <CrossFadeExamplesStatic />
      <Divider />
      <Text type="headline-6">
        Async with <Code>Suspense</Code>
      </Text>
      <CrossFadeExamplesAsync />
      <Divider />
    </>
  );
}
