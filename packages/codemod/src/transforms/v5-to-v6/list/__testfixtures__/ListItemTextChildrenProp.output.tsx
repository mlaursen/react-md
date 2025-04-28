import { type ReactElement } from "react";
import { ListItem } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <ListItem>Hello, world!</ListItem>
      <ListItem disableTextChildren>Hello, world!</ListItem>
      <ListItem>Hello, world!</ListItem>
      <ListItem disableTextChildren={!textChildren}>Hello, world!</ListItem>
    </>
  );
}
