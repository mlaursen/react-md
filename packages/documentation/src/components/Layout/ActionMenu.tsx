// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import React, { FC, useMemo } from "react";
import scssVariables from "@react-md/app-bar/dist/scssVariables";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { unitToNumber } from "@react-md/utils";

import { CodePreferenceToggle } from "components/CodePreference";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import GithubLink from "./GithubLink";
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
      <ToggleTheme as="menuitem" />,
      <ToggleRTL as="menuitem" />,
      <CodePreferenceToggle as="menuitem" />,
      <Version1MenuItem />,
      <GithubLink as="menuitem" />,
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
