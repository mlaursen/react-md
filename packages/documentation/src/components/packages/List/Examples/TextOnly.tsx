import * as React from "react";
import { List, ListItem } from "@react-md/list";

const TextOnly: React.FunctionComponent<{}> = () => (
  <List>
    <ListItem>Item 1</ListItem>
    <ListItem>Item 2</ListItem>
    <ListItem>Item 3</ListItem>
    <ListItem>Item 4</ListItem>
    <ListItem>Item 5</ListItem>
  </List>
);

export default TextOnly;
