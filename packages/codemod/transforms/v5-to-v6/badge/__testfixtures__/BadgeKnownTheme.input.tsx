import type { ReactElement } from "react";
import { Badge } from "react-md";

export default function ThemedBadges(): ReactElement {
  return (
    <>
      <Badge>1</Badge>
      <Badge theme="primary">1</Badge>
      <Badge theme="secondary">1</Badge>
      <Badge theme="default">1</Badge>
      <Badge theme="clear">1</Badge>
      <Badge theme={"default"}>1</Badge>
      <Badge theme={"theme"}>1</Badge>
    </>
  );
}
