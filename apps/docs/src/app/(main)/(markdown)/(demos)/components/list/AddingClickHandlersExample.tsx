"use client";

import { List } from "@react-md/core/list/List";
import { ListItem } from "@react-md/core/list/ListItem";
import { type ReactElement } from "react";

export default function AddingClickHandlersExample(): ReactElement {
  return (
    <List>
      <ListItem
        onClick={() => {
          // do something
        }}
      >
        Item 1
      </ListItem>
      <ListItem
        onClick={() => {
          // do something
        }}
      >
        Item 2
      </ListItem>
    </List>
  );
}
