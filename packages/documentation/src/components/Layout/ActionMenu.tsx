import type { ReactElement } from "react";
import scssVariables from "@react-md/app-bar/dist/scssVariables";
import { useActionClassName } from "@react-md/app-bar";
import { LinkSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";
import { DropdownMenu, MenuItemSeparator } from "@react-md/menu";
import { unitToNumber } from "@react-md/utils";

import { CodePreferenceToggle } from "components/CodePreference";

import ToggleTheme from "./ToggleTheme";
import ToggleRTL from "./ToggleRTL";
import GithubLink from "./GithubLink";
import TableOfContentsMenuItem from "./TableOfContentsMenuItem";
import PreviousDocsMenuItems from "./PreviousDocsMenuItems";

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
      buttonChildren={<MoreVertSVGIcon />}
      fixedPositionOptions={options}
      className={useActionClassName({
        first: true,
        last: true,
        inheritColor: true,
      })}
    >
      <ToggleTheme as="menuitem" />
      <ToggleRTL as="menuitem" />
      <CodePreferenceToggle as="menuitem" />
      <GithubLink as="menuitem" />
      <TableOfContentsMenuItem />
      <MenuItemSeparator />
      <DropdownMenu
        id="previous-documentation-links"
        buttonChildren="Documentation Version Links"
        leftAddon={<LinkSVGIcon />}
      >
        <PreviousDocsMenuItems />
      </DropdownMenu>
    </DropdownMenu>
  );
}
