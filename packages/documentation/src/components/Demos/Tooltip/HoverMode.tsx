import React, { ReactElement } from "react";
import { Tooltipped } from "@react-md/tooltip";
import { Button } from "@react-md/button";
import { HoverModeProvider } from "@react-md/utils";

import Container from "./Container";

export default function HoverMode(): ReactElement {
  return (
    <HoverModeProvider>
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
    </HoverModeProvider>
  );
}
