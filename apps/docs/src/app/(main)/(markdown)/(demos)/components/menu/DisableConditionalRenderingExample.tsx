"use client";
import { ListItem } from "@react-md/core/list/ListItem";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { useState, type ReactElement } from "react";

export default function DisableConditionalRenderingExample(): ReactElement {
  return (
    <DropdownMenu buttonChildren="Options..." temporary={false}>
      <ExampleChildren />
    </DropdownMenu>
  );
}

function ExampleChildren(): ReactElement {
  const [clicked, setClicked] = useState(-1);
  return (
    <>
      <ListItem presentational>{`Last clicked: ${clicked}`}</ListItem>
      <MenuItem
        onClick={() => {
          setClicked(0);
        }}
      >
        Item 1
      </MenuItem>
      <MenuItem
        onClick={() => {
          setClicked(1);
        }}
      >
        Item 2
      </MenuItem>
      <MenuItem
        onClick={() => {
          setClicked(2);
        }}
      >
        Item 3
      </MenuItem>
    </>
  );
}
