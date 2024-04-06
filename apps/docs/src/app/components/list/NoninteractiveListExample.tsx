import { List, ListItem } from "react-md";
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
