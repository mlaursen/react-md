"use client";
import { DropdownMenu, MenuItem, Overlay } from "@react-md/core";
import { useState, type ReactElement } from "react";

// Try clicking on an item in the `TableOfContents` with and without the overlay
export default function InvisibleOverlayExample(): ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <DropdownMenu
      buttonChildren="Dropdown"
      visible={visible}
      setVisible={setVisible}
    >
      <Overlay visible noOpacity onClick={() => setVisible(false)} />
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
