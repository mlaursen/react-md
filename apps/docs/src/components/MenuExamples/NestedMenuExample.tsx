import { Box, DropdownMenu, MenuItem, Switch } from "@react-md/core";
import type { ReactElement } from "react";
import { useState } from "react";
import { InfiniteDropdownMenu } from "./InfiniteDropdownMenu";

export function NestedMenuExample(): ReactElement {
  const [horizontal, setHorizontal] = useState(false);
  return (
    <Box stacked>
      <Switch
        label="Horizontal?"
        checked={horizontal}
        onChange={(event) => setHorizontal(event.currentTarget.checked)}
      />
      <DropdownMenu buttonChildren="Dropdown" horizontal={horizontal}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <InfiniteDropdownMenu depth={0} buttonChildren="Item 3" />
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
      </DropdownMenu>
    </Box>
  );
}
