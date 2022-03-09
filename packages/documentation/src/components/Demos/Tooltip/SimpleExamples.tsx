import { ReactElement } from "react";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

export default function SimpleExamples(): ReactElement {
  return (
    <Container stacked>
      <TooltippedButton
        id="tooltipped-top"
        tooltip="This is a tooltip"
        position="above"
      >
        Above
      </TooltippedButton>
      <TooltippedButton
        id="tooltipped-right"
        tooltip="This is a tooltip"
        position="right"
      >
        Right
      </TooltippedButton>
      <TooltippedButton
        id="tooltipped-bottom"
        tooltip="This is a tooltip"
        position="below"
      >
        Below
      </TooltippedButton>
      <TooltippedButton
        id="tooltipped-left"
        tooltip="This is a tooltip"
        position="left"
      >
        Left
      </TooltippedButton>
    </Container>
  );
}
