import React, { ReactElement } from "react";
import { TooltipHoverModeConfig, Tooltipped } from "@react-md/tooltip";
import { Button } from "@react-md/button";

import Container from "./Container";

export default function HoverMode(): ReactElement {
  return (
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
}
