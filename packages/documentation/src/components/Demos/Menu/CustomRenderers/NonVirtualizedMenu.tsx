import React, { Fragment, FC, ReactNode, useState, useMemo } from "react";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

interface Item {
  leftAvatar: ReactNode;
  children: string;
}

const NonVirtualizedMenu: FC<{ items: Item[] }> = ({ items }) => {
  const [value, setValue] = useState("None");
  const clickableItems = useMemo(
    () =>
      items.map(item => ({
        ...item,
        onClick: () => setValue(item.children),
      })),
    [items]
  );

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default NonVirtualizedMenu;
