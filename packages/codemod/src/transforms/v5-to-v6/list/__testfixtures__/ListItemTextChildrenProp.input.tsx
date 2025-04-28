import { type ReactElement } from "react";
import { ListItem } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ListItem textChildren>Hello, world!</ListItem>
      <ListItem textChildren={false}>Hello, world!</ListItem>
      <ListItem textChildren={true}>Hello, world!</ListItem>
      <ListItem textChildren={textChildren}>Hello, world!</ListItem>
    </>
  );
}
