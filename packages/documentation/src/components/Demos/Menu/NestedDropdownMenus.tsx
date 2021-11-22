// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import { ReactElement, useState } from "react";
import { Checkbox } from "@react-md/form";
import {
  DropdownMenu,
  DropdownMenuItem,
  MenuItemSeparator,
} from "@react-md/menu";

interface InfiniteNestedMenusProps {
  depth: number;
  index: number;
  portal: boolean;
}

function InfiniteNestedMenus({
  depth,
  index,
  portal,
}: InfiniteNestedMenusProps): ReactElement {
  return (
    <DropdownMenuItem
      id={`nested-menu-depth-${index}-${depth}`}
      portal={portal}
      items={[
        "Item 1",
        "Item 2",
        ...Array.from({ length: 4 }, (_, i) => (
          <InfiniteNestedMenus depth={depth + 1} index={i} portal={portal} />
        )),
        "Item 8",
      ]}
    >
      {`Current depth: ${depth} and index: ${index}`}
    </DropdownMenuItem>
  );
}

export default function NestedDropdownMenus(): ReactElement {
  const [portal, setPortal] = useState(true);

  return (
    <>
      <Checkbox
        id="nested-menu-portal"
        name="portal"
        label="Enable Portal?"
        checked={portal}
        onChange={(event) => setPortal(event.currentTarget.checked)}
      />
      <DropdownMenu
        id="simple-nested-menus-example"
        portal={portal}
        items={[
          "Item 1",
          "Item 2",
          <MenuItemSeparator />,
          <InfiniteNestedMenus depth={0} index={0} portal={portal} />,
          "Item 4",
          "Item 5",
        ]}
      >
        Simple
      </DropdownMenu>
    </>
  );
}
