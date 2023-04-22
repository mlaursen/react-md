import { Divider, TextContainer, VerticalDivider } from "@react-md/core";
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
