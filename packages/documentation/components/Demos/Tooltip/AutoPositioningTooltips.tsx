import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Tooltipped } from "@react-md/tooltip";

import Container from "./Container";

const AutoPositioningTooltips: FC = () => (
  <Container stacked>
    <Tooltipped
      id="auto-positioning-above"
      tooltip="This is a tooltip"
      defaultPosition="above"
    >
      <Button themeType="outline">Above</Button>
    </Tooltipped>
    <Tooltipped
      id="auto-positioning-right"
      tooltip="This is a tooltip"
      defaultPosition="right"
    >
      <Button themeType="outline">Right</Button>
    </Tooltipped>
    <Tooltipped
      id="auto-positioning-bottom"
      tooltip="This is a tooltip"
      defaultPosition="below"
    >
      <Button themeType="outline">Below</Button>
    </Tooltipped>
    <Tooltipped
      id="auto-positioning-left"
      tooltip="This is a tooltip"
      defaultPosition="left"
    >
      <Button themeType="outline">Left</Button>
    </Tooltipped>
  </Container>
);

export default AutoPositioningTooltips;
