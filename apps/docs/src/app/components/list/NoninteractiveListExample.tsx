import { List, ListItem } from "@react-md/core";
import { type ReactElement } from "react";

export default function NoninteractiveListExample(): ReactElement {
  return (
    <List>
      <ListItem presentational>Item 1</ListItem>
      <ListItem presentational>Item 2</ListItem>
      <ListItem presentational>Item 3</ListItem>
    </List>
  );
}
