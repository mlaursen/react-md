import { DropdownMenu, MenuItem } from "@react-md/core";
import type { ReactElement, ReactNode } from "react";

export interface InfiniteDropdownMenuProps {
  depth: number;
  buttonChildren: ReactNode;
}

export function InfiniteDropdownMenu(
  props: InfiniteDropdownMenuProps
): ReactElement {
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
