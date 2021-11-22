import { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { Typography } from "@react-md/typography";

import Code from "components/Code";

import CrossFadeExamplesAsync from "./CrossFadeExamplesAsync";
import CrossFadeExamplesStatic from "./CrossFadeExamplesStatic";

export default function CrossFadeExamples(): ReactElement {
  return (
    <>
      <Typography type="headline-6" margin="bottom">
        Static Transitions
      </Typography>
      <CrossFadeExamplesStatic />
      <Divider />
      <Typography type="headline-6">
        Async with <Code>Suspense</Code>
      </Typography>
      <CrossFadeExamplesAsync />
      <Divider />
    </>
  );
}
