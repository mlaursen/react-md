import React, { FunctionComponent } from "react";
import { TooltipHoverModeConfig, Tooltipped } from "@react-md/tooltip";
import { Button } from "@react-md/button";

import Container from "./Container";

const HoverMode: FunctionComponent = () => (
  <TooltipHoverModeConfig>
    <Container>
      {Array.from(new Array(8)).map((_, i) => (
        <Tooltipped
          id={`hover-mode-button-${i}`}
          tooltip={`Tooltip ${i + 1}`}
          key={i}
        >
          <Button>{`Button ${i + 1}`}</Button>
        </Tooltipped>
      ))}
    </Container>
  </TooltipHoverModeConfig>
);

export default HoverMode;
