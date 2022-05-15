import type { ReactElement } from "react";
import { Typography, TextContainer } from "react-md";

export default function index(): ReactElement {
  return (
    <TextContainer>
      <Typography type="headline-4">Hello, world!</Typography>
    </TextContainer>
  );
}
