import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuBar } from "@react-md/core/menu/MenuBar";
import { MenuItem } from "@react-md/core/menu/MenuItem";
import type { ReactElement, ReactNode } from "react";

export default function HoverableMenuExample(): ReactElement {
  return (
    <MenuBar hoverTimeout={0}>
      <DropdownMenu buttonChildren="Item 1">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 2">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 3">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <InfiniteDropdownMenu buttonChildren="Menu Item 3" depth={0} />
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
      <DropdownMenu buttonChildren="Item 4">
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </DropdownMenu>
    </MenuBar>
  );
}

interface InfiniteDropdownMenuProps {
  depth: number;
  buttonChildren: ReactNode;
}

function InfiniteDropdownMenu(props: InfiniteDropdownMenuProps): ReactElement {
  const { depth, buttonChildren } = props;
  return (
    <DropdownMenu buttonChildren={buttonChildren}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      {Array.from({ length: 4 }, (_, i) => (
        <InfiniteDropdownMenu
          key={i}
          depth={depth + 1}
          buttonChildren={`Item ${i + 1}`}
        />
      ))}
      <MenuItem>Item 7</MenuItem>
    </DropdownMenu>
  );
}
