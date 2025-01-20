"use client";

import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { Overlay } from "@react-md/core/overlay/Overlay";
import { type ReactElement, useState } from "react";

// Try clicking on an item in the `TableOfContents` with and without the overlay
export default function InvisibleOverlayExample(): ReactElement {
  const [visible, setVisible] = useState(false);
  return (
    <DropdownMenu
      buttonChildren="Dropdown"
      visible={visible}
      setVisible={setVisible}
    >
      <Overlay
        visible
        noOpacity
        onClick={() => {
          setVisible(false);
        }}
      />
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </DropdownMenu>
  );
}
