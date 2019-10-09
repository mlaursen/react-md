import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

import Container from "./Container";

const SimpleExamples: FC = () => (
  <Container stacked>
    <Tooltipped
      id="tooltipped-top"
      tooltip="This is a tooltip"
      position="above"
    >
      <Button themeType="outline">top</Button>
    </Tooltipped>
    <Tooltipped
      id="tooltipped-right"
      tooltip="This is a tooltip"
      position="right"
    >
      <Button themeType="outline">Right</Button>
    </Tooltipped>
    <Tooltipped
      id="tooltipped-bottom"
      tooltip="This is a tooltip"
      position="below"
    >
      <Button themeType="outline">Bottom</Button>
    </Tooltipped>
    <Tooltipped
      id="tooltipped-left"
      tooltip="This is a tooltip"
      position="left"
    >
      <Button themeType="outline">Left</Button>
    </Tooltipped>
  </Container>
);

export default SimpleExamples;
