"use client";
import { Box, DropdownMenu, MenuItem, Typography } from "@react-md/core";
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
