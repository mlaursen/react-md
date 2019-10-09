import React, { FC, Fragment } from "react";
import { Divider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

import StaticPageTransition from "./StaticPageTransition";
import AsyncPageTransitions from "./AsyncPageTransitions";

const CrossFadeExamples: FC = () => (
  <Fragment>
    <Text type="headline-6" margin="bottom">
      Static Transitions
    </Text>
    <StaticPageTransition />
    <Divider />
    <Text type="headline-6" margin="bottom">
      Async with <Code>Suspense</Code>
    </Text>
    <AsyncPageTransitions />
  </Fragment>
);

export default CrossFadeExamples;
