import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { type ReactElement } from "react";

export default function DifferentSizesExample(): ReactElement {
  return (
    <List>
      <ListItem height="auto">Auto (Default)</ListItem>
      <ListItem height="normal">Normal</ListItem>
      <ListItem height="medium">Medium</ListItem>
      <ListItem height="large">Large</ListItem>
      <ListItem height="extra-large">Extra Large</ListItem>
    </List>
  );
}
