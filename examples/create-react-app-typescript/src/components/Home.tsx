import type { ReactElement } from "react";
import { TextContainer, Typography } from "react-md";

export default function Home(): ReactElement {
  return (
    <TextContainer>
      <Typography type="headline-4">Hello, world!</Typography>
    </TextContainer>
  );
}
