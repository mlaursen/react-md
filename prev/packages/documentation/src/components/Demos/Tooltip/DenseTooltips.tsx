import type { ReactElement } from "react";
import { Typography } from "@react-md/typography";
import type { SimplePosition } from "@react-md/utils";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

const positions: SimplePosition[] = ["above", "right", "below", "left"];

export default function DenseTooltips(): ReactElement {
  return (
    <>
      <Typography type="headline-6" margin="none">
        Normal
      </Typography>
      <Container>
        {positions.map((position) => (
          <TooltippedButton
            id={`normal-tooltip-${position}`}
            key={position}
            defaultPosition={position}
            tooltip="This is a tooltip"
          >
            {position}
          </TooltippedButton>
        ))}
      </Container>
      <Typography type="headline-6" margin="top">
        Dense
      </Typography>
      <Container>
        {positions.map((position) => (
          <TooltippedButton
            id={`dense-tooltip-${position}`}
            key={position}
            defaultPosition={position}
            tooltip="This is a tooltip"
            dense
          >
            {position}
          </TooltippedButton>
        ))}
      </Container>
    </>
  );
}
