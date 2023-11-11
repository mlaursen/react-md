import { List, ListItem } from "@react-md/core";
import { type ReactElement } from "react";

export default function SimpleListExample(): ReactElement {
  return (
    <List>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </List>
  );
}
