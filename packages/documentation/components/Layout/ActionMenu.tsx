import React, { FC, useMemo } from "react";
import scssVariables from "@react-md/app-bar/dist/scssVariables";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";

import ToggleThemeMenuItem from "./ToggleThemeMenuItem";
import ToggleRTLMenuItem from "./ToggleRTLMenuItem";
import GithubLinkMenuItem from "./GithubLinkMenuItem";
import { unitToNumber } from "@react-md/utils";

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
      <GithubLinkMenuItem />,
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
      first
      last
      positionOptions={options}
    >
      <MoreVertSVGIcon />
    </DropdownMenu>
  );
};

export default ActionMenu;
