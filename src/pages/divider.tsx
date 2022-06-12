import { TextContainer } from "@react-md/core";
import { Divider, VerticalDivider } from "@react-md/divider";
import type { ReactElement } from "react";

export default function DividerPage(): ReactElement {
  return (
    <TextContainer>
      <Divider />
      <Divider inset />
      <VerticalDivider />
      <VerticalDivider />
    </TextContainer>
  );
}
