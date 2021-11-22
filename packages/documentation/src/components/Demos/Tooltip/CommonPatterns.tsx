import { ReactElement } from "react";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

export default function CommonPatterns(): ReactElement {
  return (
    <Container>
      <TooltippedButton id="tooltipped-button-1">No Tooltip</TooltippedButton>
      <TooltippedButton id="tooltipped-button-2" tooltip="This is a tooltip">
        With Tooltip
      </TooltippedButton>
    </Container>
  );
}
