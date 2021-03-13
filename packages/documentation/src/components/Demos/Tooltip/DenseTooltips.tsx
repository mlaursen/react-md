import React, { ReactElement } from "react";
import { Text } from "@react-md/typography";
import { SimplePosition } from "@react-md/utils";

import Container from "./Container";
import TooltippedButton from "./TooltippedButton";

const positions: SimplePosition[] = ["above", "right", "below", "left"];

export default function DenseTooltips(): ReactElement {
  return (
    <>
      <Text type="headline-6" margin="none">
        Normal
      </Text>
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
      <Text type="headline-6" margin="top">
        Dense
      </Text>
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
