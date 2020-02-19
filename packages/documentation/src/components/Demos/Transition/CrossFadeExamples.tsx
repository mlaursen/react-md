import React, { FC, Fragment } from "react";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

import CrossFadeExamplesStatic from "./CrossFadeExamplesStatic";
import CrossFadeExamplesAsync from "./CrossFadeExamplesAsync";

const CrossFadeExamples: FC = () => (
  <Fragment>
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
  </Fragment>
);

export default CrossFadeExamples;
