"use client";
import { Box } from "@react-md/core/box/Box";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { Typography } from "@react-md/core/typography/Typography";
import { useState, type ReactElement } from "react";

export default function MenuitemActionExample(): ReactElement {
  const [lastClicked, setLastClicked] = useState("");
  return (
    <Box stacked align="start">
      <DropdownMenu buttonChildren="Dropdown">
        <MenuItem onClick={() => setLastClicked("Item 1")}>Item 1</MenuItem>
        <MenuItem onClick={() => setLastClicked("Item 2")}>Item 2</MenuItem>
        <MenuItem onClick={() => setLastClicked("Item 3")}>Item 3</MenuItem>
      </DropdownMenu>
      <Typography>
        The last clicked item is: <code>{lastClicked || "none"}</code>
      </Typography>
    </Box>
  );
}
