// keys aren't required for the dropdown menu items
/* eslint-disable react/jsx-key */
import { ReactElement } from "react";
import scssVariables from "@react-md/app-bar/dist/scssVariables";
import { MoreVertSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { unitToNumber } from "@react-md/utils";

import { CodePreferenceToggle } from "components/CodePreference";
import { RMD_MAJOR_VERSION } from "constants/rmdVersion";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import GithubLink from "./GithubLink";
import TableOfContentsMenuItem from "./TableOfContentsMenuItem";
import VersionMenuItem from "./VersionMenuItem";

const margin = unitToNumber(scssVariables["rmd-app-bar-lr-margin"]);
const options = {
  vwMargin: margin,
  vhMargin: margin,
};

export default function ActionMenu(): ReactElement {
  return (
    <DropdownMenu
      id="main-app-actions"
      aria-label="Actions"
      menuLabel="Actions"
      buttonType="icon"
      items={[
        <ToggleTheme as="menuitem" />,
        <ToggleRTL as="menuitem" />,
        <CodePreferenceToggle as="menuitem" />,
        ...Array.from({ length: RMD_MAJOR_VERSION - 1 }, (_, i) => (
          <VersionMenuItem version={`v${i + 1}`} />
        )),
        <GithubLink as="menuitem" />,
        <TableOfContentsMenuItem />,
      ]}
      last
      positionOptions={options}
    >
      <MoreVertSVGIcon />
    </DropdownMenu>
  );
}
