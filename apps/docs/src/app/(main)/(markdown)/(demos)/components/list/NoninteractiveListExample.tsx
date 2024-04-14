import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { type ReactElement } from "react";

export default function NoninteractiveListExample(): ReactElement {
  return (
    <List>
      <ListItem role="presentation">Item 1</ListItem>
      <ListItem role="presentation">Item 2</ListItem>
      <ListItem role="presentation">Item 3</ListItem>
    </List>
  );
}
