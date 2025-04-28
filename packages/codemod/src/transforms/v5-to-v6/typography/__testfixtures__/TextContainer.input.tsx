import { type ReactElement } from "react";
import { TextContainer } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <TextContainer>
        <Typography>Hello, world!</Typography>
      </TextContainer>
      <TextContainer size="auto">
        <Typography>Hello, world!</Typography>
      </TextContainer>
      <TextContainer size="mobile">
        <Typography>Hello, world!</Typography>
      </TextContainer>
      <TextContainer size={size}>
        <Typography>Hello, world!</Typography>
      </TextContainer>
    </>
  );
}
