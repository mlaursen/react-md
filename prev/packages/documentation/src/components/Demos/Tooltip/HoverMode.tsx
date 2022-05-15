import type { ReactElement } from "react";
import { HoverModeProvider } from "@react-md/utils";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

export default function HoverMode(): ReactElement {
  return (
    <HoverModeProvider>
      <Container>
        {Array.from({ length: 8 }).map((_, i) => (
          <TooltippedButton
            id={`hover-mode-button-${i}`}
            tooltip={`Tooltip ${i + 1}`}
            key={i}
          >
            {`Button ${i + 1}`}
          </TooltippedButton>
        ))}
      </Container>
    </HoverModeProvider>
  );
}
