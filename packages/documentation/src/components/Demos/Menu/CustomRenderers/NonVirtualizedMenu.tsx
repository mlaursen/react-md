import { ReactElement, ReactNode, useMemo, useState } from "react";
import { ListItemAddonType } from "@react-md/list";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code";

interface Item {
  leftAddon: ReactNode;
  leftAddonType: ListItemAddonType;
  children: string;
}

export default function NonVirtualizedMenu({
  items,
}: {
  items: Item[];
}): ReactElement {
  const [value, setValue] = useState("None");
  const clickableItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        onClick: () => setValue(item.children),
      })),
    [items]
  );

  return (
    <>
      <Text>
        Last clicked value: <Code>{value}</Code>
      </Text>
      <DropdownMenu
        id="non-virtualized-example"
        menuLabel="Large Menu"
        theme="warning"
        items={clickableItems}
      >
        Non-Virtualized
      </DropdownMenu>
    </>
  );
}
