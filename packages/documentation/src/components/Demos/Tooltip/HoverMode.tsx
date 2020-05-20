import React, { FC } from "react";
import { TooltipHoverModeConfig, Tooltipped } from "@react-md/tooltip";
import { Button } from "@react-md/button";

import Container from "./Container";

const HoverMode: FC = () => (
  <TooltipHoverModeConfig>
    <Container>
      {Array.from({ length: 8 }).map((_, i) => (
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
