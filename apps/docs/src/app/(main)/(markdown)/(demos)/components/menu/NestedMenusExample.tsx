import { Box } from "@react-md/core/box/Box";
import { Switch } from "@react-md/core/form/Switch";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import { type ReactElement, useState } from "react";

export default function NestedMenusExample(): ReactElement {
  const [horizontal, setHorizontal] = useState(false);

  return (
    <Box stacked>
      <Switch
        label="Horizontal?"
        checked={horizontal}
        onChange={(event) => {
          setHorizontal(event.currentTarget.checked);
        }}
      />
      <DropdownMenu buttonChildren="Dropdown" horizontal={horizontal}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <DropdownMenu buttonChildren="Item 3">
          <MenuItem>Item 1</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </DropdownMenu>
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
      </DropdownMenu>
    </Box>
  );
}
