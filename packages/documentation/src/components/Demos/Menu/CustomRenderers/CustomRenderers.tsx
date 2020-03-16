import React, { FC } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";

import NonVirtualizedMenu from "./NonVirtualizedMenu";
import VirtualizedMenu from "./VirtualizedMenu";

const colors = Object.keys(scssVariables["rmd-avatar-colors"]);
const items = Array.from(new Array(1000), (_, i) => ({
  leftAvatar: <Avatar color={colors[i % colors.length]} />,
  children: `Item ${i + 1}`,
}));

const CustomRenderers: FC = () => (
  <>
    <NonVirtualizedMenu items={items} />
    <VirtualizedMenu items={items} />
  </>
);

export default CustomRenderers;
