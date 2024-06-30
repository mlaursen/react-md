import { type ReactElement } from "react";
import { TextContainer } from "react-md";

export default function Example(): ReactElement {
  return (<>
    <TextContainer>
      <Typography>Hello, world!</Typography>
    </TextContainer>
    <TextContainer>
      <Typography>Hello, world!</Typography>
    </TextContainer>
    <TextContainer>
      <Typography>Hello, world!</Typography>
    </TextContainer>
    <TextContainer>
      <Typography>Hello, world!</Typography>
    </TextContainer>
  </>);
}
