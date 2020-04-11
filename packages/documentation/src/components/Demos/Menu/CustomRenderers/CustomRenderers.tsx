import React, { FC, ReactNode } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";
import { ListItemAddonType } from "@react-md/list";

import NonVirtualizedMenu from "./NonVirtualizedMenu";
import VirtualizedMenu from "./VirtualizedMenu";

interface Item {
  leftAddon: ReactNode;
  leftAddonType: ListItemAddonType;
  children: string;
}

const colors = Object.keys(scssVariables["rmd-avatar-colors"]);
const items: Item[] = Array.from(new Array(1000), (_, i) => ({
  leftAddon: <Avatar color={colors[i % colors.length]} />,
  leftAddonType: "avatar",
  children: `Item ${i + 1}`,
}));

const CustomRenderers: FC = () => (
  <>
    <NonVirtualizedMenu items={items} />
    <VirtualizedMenu items={items} />
  </>
);

export default CustomRenderers;
