import React, { FC, useMemo } from "react";
import scssVariables from "@react-md/app-bar/dist/scssVariables";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { unitToNumber } from "@react-md/utils";

import ToggleThemeMenuItem from "./ToggleThemeMenuItem";
import ToggleRTLMenuItem from "./ToggleRTLMenuItem";
import GithubLinkMenuItem from "./GithubLinkMenuItem";
import TableOfContentsMenuItem from "./TableOfContentsMenuItem";
import Version1MenuItem from "./Version1MenuItem";

const margin = unitToNumber(scssVariables["rmd-app-bar-lr-margin"]);
const options = {
  vwMargin: margin,
  vhMargin: margin,
};

const ActionMenu: FC = () => {
  const items = useMemo(
    () => [
      <ToggleThemeMenuItem />,
      <ToggleRTLMenuItem />,
      <Version1MenuItem />,
      <GithubLinkMenuItem />,
      <TableOfContentsMenuItem />,
    ],
    []
  );

  return (
    <DropdownMenu
      id="main-app-actions"
      aria-label="Actions"
      menuLabel="Actions"
      buttonType="icon"
      items={items}
      last
      positionOptions={options}
    >
      <MoreVertSVGIcon />
    </DropdownMenu>
  );
};

export default ActionMenu;
