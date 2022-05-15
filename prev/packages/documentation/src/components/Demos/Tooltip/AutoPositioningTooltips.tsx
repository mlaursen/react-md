import type { ReactElement } from "react";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

export default function AutoPositioningTooltips(): ReactElement {
  return (
    <Container stacked>
      <TooltippedButton
        id="auto-positioning-above"
        tooltip="This is a tooltip"
        defaultPosition="above"
      >
        Above
      </TooltippedButton>
      <TooltippedButton
        id="auto-positioning-right"
        tooltip="This is a tooltip"
        defaultPosition="right"
      >
        Right
      </TooltippedButton>
      <TooltippedButton
        id="auto-positioning-bottom"
        tooltip="This is a tooltip"
        defaultPosition="below"
      >
        Below
      </TooltippedButton>
      <TooltippedButton
        id="auto-positioning-left"
        tooltip="This is a tooltip"
        defaultPosition="left"
      >
        Left
      </TooltippedButton>
    </Container>
  );
}
