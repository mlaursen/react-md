"use client";
import { List, ListItem } from "@react-md/core";
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
