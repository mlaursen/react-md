import React, { Fragment, FC, ReactNode, useState } from "react";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";

type Item = { leftAvatar: ReactNode; children: string };

const NonVirtualizedMenu: FC<{ items: Item[] }> = ({ items }) => {
  const [value, setValue] = useState("None");
  return (
    <Fragment>
      <Text>
        Last clicked value: <Code>{value}</Code>
      </Text>
      <DropdownMenu
        id="non-virtualized-example"
        menuLabel="Large Menu"
        theme="warning"
        items={items}
        onItemClick={item => {
          setValue((item as Item).children);
        }}
      >
        Non-Virtualized
      </DropdownMenu>
    </Fragment>
  );
};

export default NonVirtualizedMenu;
