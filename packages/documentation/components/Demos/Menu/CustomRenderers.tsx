import React, { FunctionComponent, Fragment } from "react";
import { Avatar } from "@react-md/avatar";
import scssVariables from "@react-md/avatar/dist/scssVariables";

import VirtualizedMenu from "./VirtualizedMenu";
import NonVirtualizedMenu from "./NonVirtualizedMenu";

const colors = Object.keys(scssVariables["rmd-avatar-colors"]);
const items = Array.from(new Array(1000), (_, i) => ({
  leftAvatar: <Avatar color={colors[i % colors.length]} />,
  children: `Item ${i + 1}`,
}));

const CustomRenderers: FunctionComponent = () => (
  <Fragment>
    <NonVirtualizedMenu items={items} />
    <VirtualizedMenu items={items} />
  </Fragment>
);

export default CustomRenderers;
